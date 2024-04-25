import { z } from "zod";

export const ArticleSchema = z.object({
  article_id: z.number(),
  title: z.string(),
  topic: z.string(),
  author: z.string(),
  body: z.string().optional(),
  created_at: z.string(),
  votes: z.number(),
  comment_count: z.union([z.number(), z.string()]),
});

export type Article = z.infer<typeof ArticleSchema>;

export const ArticlesArraySchema = z.array(ArticleSchema);