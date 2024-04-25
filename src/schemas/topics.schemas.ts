import { z } from "zod";

export const TopicSchema = z.object({
  slug: z.string(),
  description: z.string(),
});

export type Topic = z.infer<typeof TopicSchema>;

export const TopicsArraySchema = z.array(TopicSchema);
