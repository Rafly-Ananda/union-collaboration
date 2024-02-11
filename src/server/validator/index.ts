import { z } from "zod";
import { ProjectValidator } from "./project";
import {
  UserValidator,
  UserDiscordValidator,
  TrimmedUserDiscordValidator,
  DiscordGuildValidator,
} from "./user";

/** TYPES **/
export type Project = z.infer<typeof ProjectValidator>;
export type User = z.infer<typeof UserValidator>;
export type UserDiscord = z.infer<typeof UserDiscordValidator>;
export type TrimmedUserDiscord = z.infer<typeof TrimmedUserDiscordValidator>;
export type UserDiscordGuild = z.infer<typeof DiscordGuildValidator>;

/** VALIDATORS **/
export const projctResponseValidator = ProjectValidator;
export const userDiscordResponseValidator = UserDiscordValidator;
export const DiscordGuildResponseValidator = DiscordGuildValidator;
