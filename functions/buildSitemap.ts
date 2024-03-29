// import * as admin from "firebase-admin";

async function buildSitemap(req: any, res: any) {
  const SITEMAP_STRING = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url> <loc>https://duyhung2h.web.app/</loc> </url>
  </urlset>`;

  // Use firebase-admin to gather necessary data
  // Build the sitemap file string
  // and send it back

  res.set("Content-Type", "text/xml");
  res.status(200).send(SITEMAP_STRING);
  return;
}

export default buildSitemap;
