/**
 * DontMailMe — Gmail auto-unsubscribe script (https://dontmailme.org/gmail)
 * Free & open source (MIT). Runs entirely inside YOUR Google account.
 * Method: RFC 8058 one-click unsubscribe. We never see your data.
 *
 * SETUP (humans: https://dontmailme.org/gmail · agents: https://dontmailme.org/AGENTS.md)
 *   1. Open https://script.google.com and click "New project".
 *   2. Add the advanced Gmail service: Services (+) → Gmail API → Add.
 *   3. Paste this whole file (set ALLOWED_SENDERS below to keep senders you trust).
 *   4. Run "testDryRun" once and check the logs (nothing is changed yet).
 *   5. Run "installTrigger" once. It now runs every 15 minutes.
 *
 * To keep senders you trust, list them in ALLOWED_SENDERS below.
 */

'use strict';

// Senders to NEVER unsubscribe from. Example: ['news@mycompany.com', 'team@substack.com']
const ALLOWED_SENDERS = [];

// Optional: override the Gmail search query. Leave '' for the sensible default.
const CUSTOM_QUERY = '';

function testDryRun() {
    Logger.log('START DRY RUN');
    processEmails(true);
    Logger.log('END DRY RUN');
}

function installTrigger() {
    ScriptApp.getProjectTriggers().forEach(function(t) {
        ScriptApp.deleteTrigger(t);
    });
    ScriptApp.newTrigger('runJob').timeBased().everyMinutes(15).create();
}

function runJob() {
    processEmails(false);
}

function processEmails(isDryRun) {
    const defaultQuery = 'is:unread (category:promotions OR list:unsubscribe)';
    const query = CUSTOM_QUERY || defaultQuery;
    const threads = GmailApp.search(query, 0, 50);
    let processedCount = 0;
    const processedSenders = [];

    for (let i = 0; i < threads.length; i++) {
        const messages = threads[i].getMessages();
        for (let j = messages.length - 1; j >= 0; j--) {
            const message = messages[j];
            if (!message.isUnread()) continue;

            const id = message.getId();
            const sender = message.getFrom();
            const emailMatch = sender.match(/<([^>]+)>/);
            const email = emailMatch ? emailMatch[1].toLowerCase() : sender.toLowerCase();

            const isWhitelisted = ALLOWED_SENDERS.some(function(s) { return email === s.toLowerCase(); });
            if (isWhitelisted) continue;

            if (processedSenders.indexOf(email) !== -1) {
                if (!isDryRun) {
                    try { Gmail.Users.Messages.trash('me', id); } catch (e) {}
                }
                continue;
            }

            try {
                const metadata = Gmail.Users.Messages.get('me', id, {
                    format: 'metadata',
                    metadataHeaders: ['List-Unsubscribe', 'List-Unsubscribe-Post', 'Authentication-Results']
                });

                if (!metadata.payload || !metadata.payload.headers) continue;

                let listUnsub = '';
                let listUnsubPost = '';
                let authResults = '';

                metadata.payload.headers.forEach(function(header) {
                    const name = header.name.toLowerCase();
                    if (name === 'list-unsubscribe') listUnsub = header.value;
                    else if (name === 'list-unsubscribe-post') listUnsubPost = header.value;
                    else if (name === 'authentication-results') authResults = header.value;
                });

                if (!listUnsub) continue;

                const urlMatch = listUnsub.match(/<(https:\/\/[^>]+)>/i);
                if (!urlMatch || !urlMatch[1]) continue;

                const postUrl = urlMatch[1];
                const supportsOneClick = listUnsubPost.indexOf('List-Unsubscribe=One-Click') !== -1;
                const isAuthenticated = authResults.indexOf('spf=pass') !== -1 || authResults.indexOf('dkim=pass') !== -1;

                if (!supportsOneClick && !isAuthenticated) continue;

                if (isDryRun) {
                    const method = supportsOneClick ? 'POST' : 'GET';
                    Logger.log('WILL UNSUBSCRIBE [' + method + ']: ' + email);
                    processedSenders.push(email);
                    processedCount++;
                    continue;
                }

                let success = false;

                if (supportsOneClick) {
                    const response = UrlFetchApp.fetch(postUrl, {
                        method: 'post',
                        contentType: 'application/x-www-form-urlencoded',
                        payload: 'List-Unsubscribe=One-Click',
                        muteHttpExceptions: true,
                        followRedirects: true
                    });
                    const code = response.getResponseCode();
                    if (code >= 200 && code < 400) success = true;
                } else {
                    const response = UrlFetchApp.fetch(postUrl, {
                        method: 'get',
                        muteHttpExceptions: true,
                        followRedirects: true
                    });
                    const code = response.getResponseCode();
                    if (code >= 200 && code < 400) success = true;
                }

                if (success) {
                    Gmail.Users.Messages.trash('me', id);
                    processedSenders.push(email);
                    processedCount++;
                }
            } catch (e) {}
        }
    }

    Logger.log('Processed unique senders: ' + processedCount);
}
