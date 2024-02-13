import { z } from "zod";
import { UserValidator } from "./user";

enum EmintInfo {
  PRE = "pre",
  DAO = "dao",
  POST = "post",
}

export const ProjectValidator = z.object({
  id: z.string().optional(),
  project_name: z.string(),
  type: z.string(),
  description: z.string(),
  mint_date: z.string().nullish(),
  supply: z.number().optional(),
  discord: z.string(),
  twitter: z.string(),
  logo_url: z.string(),
  created_by: z.string().optional(),
  status: z.string().optional(),
  website: z.string(),
  mint_info: z.nativeEnum(EmintInfo).optional(),
  avl_wl_spots: z.number().optional(),
  guild_id: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  whitelist_role: z.string(),
  users: z.array(UserValidator).optional(),
});

export const DaoValidator = z.object({
  id: z.string(),
  project_name: z.string(),
  description: z.string(),
  type: z.string(),
  discord: z.string(),
  twitter: z.string(),
  website: z.string(),
  logo_url: z.string(),
  whitelist_role: z.string(),
  mint_info: z.string(),
});
