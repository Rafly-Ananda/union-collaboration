import { z } from "zod";
import { ProjectValidator } from "./project";
import { CollabValidator, CollabWhitelistedValidator } from "./collab";
import {
  UserExternalValidator,
  UserDiscordValidator,
  UserGuildValidator,
  DiscordGuildValidator,
  DiscordGuildRolesValidator,
  VerifiedLinksValidator,
} from "./user";

import type { UserValidator, TrimmedUserDiscordValidator } from "./user";

/** TYPES **/
export type Project = z.infer<typeof ProjectValidator>;
export type UserExternal = z.infer<typeof UserExternalValidator>;
export type User = z.infer<typeof UserValidator>;
export type UserDiscord = z.infer<typeof UserDiscordValidator>;
export type TrimmedUserDiscord = z.infer<typeof TrimmedUserDiscordValidator>;
export type UserDiscordGuild = z.infer<typeof DiscordGuildValidator>;
export type DiscordGuildRoles = z.infer<typeof DiscordGuildRolesValidator>;
export type UserOwnDiscordGuild = z.infer<typeof UserGuildValidator>;
export type CollabRequest = z.infer<typeof CollabValidator>;
export type VerifiedLinks = z.infer<typeof VerifiedLinksValidator>;
export type CollabReqWhitelist = z.infer<typeof CollabWhitelistedValidator>;

/** VALIDATORS **/
export const projectResponseValidator = z.array(ProjectValidator);
export const userDiscordResponseValidator = UserDiscordValidator;
export const DiscordGuildResponseValidator = z.array(DiscordGuildValidator);
export const DiscordGuildRolesResponseValidator = DiscordGuildRolesValidator;
export const UserExternalResponseValidator = UserExternalValidator;
export const UserGuildResponseValidator = z.array(UserGuildValidator);
export const CollabRequestResponseValidator = z.array(CollabValidator);
export const SingleCollabReqResponseValidator = CollabValidator;
export const VerifiedLinksResponseValidator = z.array(VerifiedLinksValidator);
export const CollabReqWhitelistResponseValidator = z.array(
  CollabWhitelistedValidator,
);
