import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.SITE_URL;
  return base
    ? [
        "",
        "/catalogo",
        "/galeria",
        "/encomenda",
        "/sobre",
        "/contato",
        "/privacidade",
      ].map((path) => ({ url: `${base}${path}` }))
    : [];
}
