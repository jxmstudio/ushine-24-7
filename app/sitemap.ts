import type { MetadataRoute } from "next";

import { site } from "@/data/site";
import { services } from "@/data/services";
import { suburbs } from "@/data/suburbs";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/quote", priority: 0.9 },
    { path: "/areas", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
    { path: "/about", priority: 0.6 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route.priority,
    })),
    ...services.map((service) => ({
      url: `${site.url}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...suburbs.map((suburb) => ({
      url: `${site.url}/areas/${suburb.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
