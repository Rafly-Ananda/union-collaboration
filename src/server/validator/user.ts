import { z } from "zod";

export const UserValidator = z.object({
    id: z.string(),
    discord_id: z.string(),
    username: z.string(),
    discriminator: z.string(),
    avatar: z.string(),
})
