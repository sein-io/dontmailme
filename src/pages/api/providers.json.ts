import type { APIRoute } from 'astro';
import { providers, providersMeta } from '../../data/providers';

// Published machine API — static file at /api/providers.json. Mirrors src/data/providers.yaml.
export const prerender = true;

export const GET: APIRoute = () =>
  new Response(JSON.stringify({ ...providersMeta, providers }, null, 2) + '\n', {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
