// Guards the one rule that protects the user's mail:
// only a confirmed one-click unsubscribe may delete a message.
// Run: node test/gmail-script.test.mjs
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';

const src = readFileSync(join(process.cwd(), 'static/gmail.gs'), 'utf8');

function run(msgs, allowed = []) {
  const state = { trashed: [], read: [], fetches: [], logs: [] };
  const code = src.replace(
    'const ALLOWED_SENDERS = [];',
    `const ALLOWED_SENDERS = ${JSON.stringify(allowed)};`,
  );

  const messages = msgs.map((m) => ({
    getId: () => m.id,
    getFrom: () => m.from,
    isUnread: () => m.unread !== false,
    markRead: () => state.read.push(m.id),
  }));

  const GmailApp = { search: () => [{ getMessages: () => messages }] };
  const Gmail = {
    Users: {
      Messages: {
        get(_user, id) {
          const m = msgs.find((x) => x.id === id);
          const headers = [];
          if (m.listUnsub) headers.push({ name: 'List-Unsubscribe', value: m.listUnsub });
          if (m.oneClick) headers.push({ name: 'List-Unsubscribe-Post', value: 'List-Unsubscribe=One-Click' });
          if (m.auth) headers.push({ name: 'Authentication-Results', value: m.auth });
          return { payload: { headers } };
        },
        trash: (_user, id) => state.trashed.push(id),
      },
    },
  };
  const UrlFetchApp = {
    fetch(url, opts) {
      state.fetches.push({ url, method: opts.method });
      return { getResponseCode: () => 200 };
    },
  };
  const Logger = { log: (s) => state.logs.push(String(s)) };
  const ScriptApp = { getProjectTriggers: () => [], deleteTrigger() {}, newTrigger: () => ({ timeBased: () => ({ everyMinutes: () => ({ create() {} }) }) }) };

  const factory = new Function('GmailApp', 'Gmail', 'UrlFetchApp', 'Logger', 'ScriptApp', `${code}\nreturn { runJob };`);
  factory(GmailApp, Gmail, UrlFetchApp, Logger, ScriptApp).runJob();
  return state;
}

const ONE_CLICK = { id: 'a1', from: 'News <a@one.com>', listUnsub: '<https://one.com/u/1>', oneClick: true, auth: 'spf=pass' };
const LEGACY = { id: 'b1', from: 'Old <b@two.com>', listUnsub: '<https://two.com/u/2>', auth: 'spf=pass' };

// 1. One-click: confirmed by the sender's endpoint → unsubscribe by POST and delete.
{
  const s = run([ONE_CLICK]);
  assert.deepEqual(s.trashed, ['a1'], 'one-click mail must be deleted');
  assert.equal(s.fetches[0].method, 'post');
  assert.deepEqual(s.read, [], 'one-click mail is deleted, not just marked read');
}

// 2. Legacy sender: a GET cannot confirm anything → never delete, keep and mark read.
{
  const s = run([LEGACY]);
  assert.deepEqual(s.trashed, [], 'unconfirmable unsubscribe must not delete mail');
  assert.deepEqual(s.read, ['b1'], 'legacy mail is kept and marked read');
  assert.equal(s.fetches[0].method, 'get');
}

// 3. A second mail from a legacy sender must not be deleted either (dedupe back door).
{
  const s = run([LEGACY, { ...LEGACY, id: 'b2' }]);
  assert.deepEqual(s.trashed, [], 'later mail from an unconfirmed sender must survive');
  assert.deepEqual(s.read.sort(), ['b1', 'b2']);
}

// 4. A second mail from a confirmed sender is cleaned up.
{
  const s = run([ONE_CLICK, { ...ONE_CLICK, id: 'a2' }]);
  assert.deepEqual(s.trashed.sort(), ['a1', 'a2']);
}

// 5. Whitelisted senders are never touched.
{
  const s = run([ONE_CLICK], ['a@one.com']);
  assert.deepEqual(s.trashed, []);
  assert.deepEqual(s.fetches, [], 'no request may be sent for a whitelisted sender');
}

// 6. No List-Unsubscribe header → leave the mail alone.
{
  const s = run([{ id: 'c1', from: 'Human <c@three.com>' }]);
  assert.deepEqual(s.trashed, []);
  assert.deepEqual(s.fetches, []);
  assert.deepEqual(s.read, []);
}

// 7. Unauthenticated sender without one-click → no request at all.
{
  const s = run([{ id: 'd1', from: 'Spam <d@four.com>', listUnsub: '<https://four.com/u>' }]);
  assert.deepEqual(s.fetches, [], 'unauthenticated legacy sender must be skipped');
  assert.deepEqual(s.trashed, []);
}

console.log('gmail.gs: all 7 checks passed');
