import { defineCollection, z } from "@nuxt/content";

const baseSchema = {
  title: z.string().nonempty(),
  description: z.string().nonempty()
}

const authorSchema = {
  name: z.string().nonempty(),
  to: z.string().nonempty(),
  avatar: z.object({ src: z.string().nonempty() })
}

const imageSchema = z.object({
  src: z.string().nonempty(),
  alt: z.string().optional(),
  loading: z.string().optional(),
  srcset: z.string().optional(),
  caption: z.string().optional(),
  credit: z.object({
    owner: z.string().optional(),
    url: z.string().optional(),
  })
})

const catalogSchema = z.object({
  ...baseSchema,
  heading: z.string().optional()
})

const lessonSchema = z.object({
  ...baseSchema,
  image: imageSchema,
  published: z.boolean(),
  lastUpdate: z.string().optional(),
  badge: z.object({ label: z.string().nonempty() })
})

const postSchema = z.object({
  ...baseSchema,
  image: imageSchema,
  authors: z.array(
    z.object(authorSchema)
  ),
  published: z.boolean(),
  postedAt: z.string().optional(),
  lastUpdate: z.string().optional(),
  badge: z.object({ label: z.string().nonempty() })
})

export const collections = {
  lessons: defineCollection({
    type: 'page',
    source: '1.get-smarter/**/*',
    schema: lessonSchema
  }),
  posts: defineCollection({
    type: 'page',
    source: '2.essays/**/*',
    schema: postSchema
  }),
  catalog: defineCollection({
    source: '1.lessons.yml',
    type: 'data',
    schema: catalogSchema
  })
}
