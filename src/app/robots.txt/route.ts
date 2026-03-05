export async function GET() {
  const body = `User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: Bytespider
Allow: /

Sitemap: https://s77.ai/sitemap.xml
LLMs: https://s77.ai/llms.txt
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
