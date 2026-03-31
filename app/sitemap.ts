import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://manascare.vercel.app";

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/checkin`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/journal`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/vedic`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/vent`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
