import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    slug: z.string().optional(),
  }),
});

const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    slug: z.string().optional(),
  }),
});

const services = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    slug: z.string().optional(),
  }),
});

const tradeFairs = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    startdate: z.coerce.date(),
    enddate: z.coerce.date(),
    slug: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
  }),
});


export const collections = {
  posts,
  pages,
  'trade-fairs': tradeFairs,
  services
};
