import { z } from "zod";
import { UserValidator } from "./user";

export const ProjectValidator = z.object({
    id: z.string(),
    project_name: z.string(),
    type: z.string(),
    description: z.string(),
    mint_date: z.string(),
    supply: z.number(),
    discord: z.string(),
    twitter: z.string(),
    logo_url: z.string(),
    created_by: z.string(),
    status: z.string(),
    website: z.string(),
    mint_info: z.string(),
    avl_wl_spots: z.number(),
    guild_id: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    whitelist_role: z.string(),
    users: z.array(UserValidator).optional()
})
