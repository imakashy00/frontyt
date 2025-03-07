import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard/",
        "/api/",
        "/admin/",
        "/_next/",
        "/login/callback",
      ],
    },
    sitemap: "https://ytnotes.co/sitemap.xml",
  };
}
