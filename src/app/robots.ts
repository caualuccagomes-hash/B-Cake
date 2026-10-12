import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(process.env.SITE_URL ? { allow: "/" } : { disallow: "/" }),
    },
    ...(process.env.SITE_URL
      ? { sitemap: `${process.env.SITE_URL}/sitemap.xml` }
      : {}),
  };
}
