import { z } from "zod";
import { ProjectValidator } from "./project";
import { CollabValidator } from "./collab";
import {
  UserExternalValidator,
  UserValidator,
  UserDiscordValidator,
  UserGuildValidator,
  TrimmedUserDiscordValidator,
  DiscordGuildValidator,
} from "./user";

/** TYPES **/
export type Project = z.infer<typeof ProjectValidator>;
export type UserExternal = z.infer<typeof UserExternalValidator>;
export type User = z.infer<typeof UserValidator>;
export type UserDiscord = z.infer<typeof UserDiscordValidator>;
export type TrimmedUserDiscord = z.infer<typeof TrimmedUserDiscordValidator>;
export type UserDiscordGuild = z.infer<typeof DiscordGuildValidator>;
export type UserOwnDiscordGuild = z.infer<typeof UserGuildValidator>;
export type CollabRequest = z.infer<typeof CollabValidator>;

/** VALIDATORS **/
export const projectResponseValidator = z.array(ProjectValidator);
export const userDiscordResponseValidator = UserDiscordValidator;
export const DiscordGuildResponseValidator = DiscordGuildValidator;
export const UserExternalResponseValidator = UserExternalValidator;
export const UserGuildResponseValidator = z.array(UserGuildValidator);
export const CollabRequestResponseValidator = z.array(CollabValidator);
