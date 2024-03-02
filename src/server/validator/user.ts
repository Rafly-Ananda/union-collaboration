import { z } from "zod";

export const UserExternalValidator = z.object({
  id: z.string(),
  discord_id: z.string(),
  username: z.string(),
  discriminator: z.string(),
  avatar: z.string().nullable(),
  is_project: z.boolean(),
  is_dao: z.boolean(),
  created_at: z.string().nullish(),
  updated_at: z.string().nullish(),
});

export const UserValidator = z.object({
  id: z.string(),
  discord_id: z.string(),
  username: z.string(),
  discriminator: z.string(),
  avatar: z.string(),
});

export const UserDiscordValidator = z.object({
  id: z.string(),
  username: z.string(),
  avatar: z.string().nullable(),
  discriminator: z.string(),
  public_flags: z.number(),
  premium_type: z.number(),
  flags: z.number(),
  banner: z.nullable(z.string()),
  accent_color: z.number().nullable(),
  global_name: z.string().nullable(),
  avatar_decoration_data: z.nullable(z.unknown()),
  banner_color: z.string().nullable(),
  mfa_enabled: z.boolean(),
  locale: z.string(),
  email: z.string().optional(),
  verified: z.boolean().optional(),
});

export const TrimmedUserDiscordValidator = z.object({
  id: z.string(),
  username: z.string(),
  avatar: z.string().nullable(),
  discriminator: z.string(),
});

export const DiscordGuildValidator = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
  owner: z.boolean(),
  permissions: z.string(),
  features: z.array(z.string()),
});

export const DiscordGuildRolesValidator = z.object({
  server: z.string(),
  roles: z.array(z.string()),
});

export const UserGuildValidator = z.object({
  id: z.string(),
  discord_id: z.string(),
  username: z.string(),
  discriminator: z.string(),
  avatar: z.string(),
  is_project: z.boolean(),
  is_dao: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  guild_id: z.string(),
  guild_name: z.string(),
});

export const VerifiedLinksValidator = z.object({
  id: z.string(),
  url: z.string(),
  status: z.enum(["pending", "approved", "rejected"]),
  created_by: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});
