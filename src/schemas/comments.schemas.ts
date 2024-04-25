import { z } from "zod";

export const CommentSchema = z.object({
    comment_id: z.number().optional(),
    votes: z.number(),
    created_at: z.string(),
    author: z.string(),
    body: z.string(),
  });
  
  export type Comment = z.infer<typeof CommentSchema>;
  
  export const CommentsArraySchema = z.array(CommentSchema);