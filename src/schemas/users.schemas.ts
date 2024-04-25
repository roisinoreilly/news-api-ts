import { z } from "zod";

export const UserSchema = z.object({
    username: z.string(),
    avatar_url: z.string()
});

export type User = z.infer<typeof UserSchema>;

export const UsersSchema = z.array(UserSchema);