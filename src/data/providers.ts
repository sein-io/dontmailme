import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';

export interface Provider {
  name: string;
  slug: string;
  tier: 'A' | 'B' | 'C';
  method: string;
  status: 'live' | 'planned' | 'unsupported';
  region: string;
  rfc8058: boolean | string;
  setup?: string;
  appPassword?: string;
  note?: string;
}

const doc = parse(readFileSync(join(process.cwd(), 'src/data/providers.yaml'), 'utf8'));

export const providersMeta = { version: doc.version as number, updated: String(doc.updated) };
export const providers = doc.providers as Provider[];

export const METHOD_LABEL: Record<string, string> = {
  'gmail-apps-script': 'Apps Script (automatic)',
  'outlook-desktop': 'PowerShell (local)',
  'apple-mail': 'AppleScript (local)',
  'imap-app-password': 'IMAP + app password',
  'imap-bridge': 'IMAP via Bridge',
  none: '—',
};

export function rfcLabel(v: boolean | string): string {
  if (v === true || v === 'yes') return 'Yes';
  if (v === false || v === 'no') return 'No';
  return 'Unknown';
}
