import type { InewProjectInput } from "./project";
import type { InewDaoInput } from "./dao";
import type { INewCollaborationRequest } from "./collaboration";
import type { InewWhitelistInput, EWhitelistType } from "./whitelist";
import type { IUser, IUserGuilds } from "./user";
import { EmintInfo } from "./project";

export interface Iguild {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permission: string;
  features: string[];
}

export interface IProject {
  id?: string;
  project_name?: string;
  type?: string;
  description?: string;
  mint_date?: string | null;
  supply?: number;
  discord?: string;
  twitter?: string;
  logo_url?: string;
  created_by?: string;
  status?: string;
  website?: string;
  mint_info?: EmintInfo;
  avl_wl_spots?: number;
  guild_id?: string;
  created_at?: string;
  updated_at?: string;
  whitelist_role?: string;
  users?: IUser[];
}

export type {
  InewDaoInput,
  InewProjectInput,
  INewCollaborationRequest,
  InewWhitelistInput,
  EWhitelistType,
  IUserGuilds,
};

export { EmintInfo };
