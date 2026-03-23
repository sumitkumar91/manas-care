import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Manas Care",
    short_name: "Manas Care",
    description: "Mental wellness rooted in Vedic science",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    orientation: "portrait",
    icons: [
      {
        src: "/logo2.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo2.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
