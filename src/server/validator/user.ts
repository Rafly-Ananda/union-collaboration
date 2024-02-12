import { z } from "zod";

export const UserExternalValidator = z.object({
  id: z.string(),
  discord_id: z.string(),
  username: z.string(),
  discriminator: z.string(),
  avatar: z.string(),
  is_project: z.boolean(),
  is_dao: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
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
  avatar: z.string(),
  discriminator: z.string(),
  public_flags: z.number(),
  premium_type: z.number(),
  flags: z.number(),
  banner: z.nullable(z.string()),
  accent_color: z.number(),
  global_name: z.string(),
  avatar_decoration_data: z.nullable(z.unknown()),
  banner_color: z.string(),
  mfa_enabled: z.boolean(),
  locale: z.string(),
  email: z.string(),
  verified: z.boolean(),
});

export const TrimmedUserDiscordValidator = z.object({
  id: z.string(),
  username: z.string(),
  avatar: z.string(),
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
