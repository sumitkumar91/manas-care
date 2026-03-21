import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/mood", "/journal", "/chat", "/vent", "/music", "/meditate", "/profile", "/onboarding", "/convert"],
    },
    sitemap: "https://manascare.vercel.app/sitemap.xml",
  };
}
