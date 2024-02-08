import type { InewProjectInput, EmintInfo } from "./project";
import type { InewDaoInput } from "./dao";
import type { INewCollaborationRequest } from "./collaboration";

export interface Iguild {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permission: string;
  features: string[];
}

export interface IProject {
  discord_server: string;
  description: string;
  whitelist_role?: string;
  mint_info: EmintInfo;
  mint_date?: string;
  supply?: number;
  available_wl_spot?: number;
  discord_link?: string;
  x_link?: string;
  web_link?: string;
  project_logo?: HTMLInputElement;
}

export type {
  InewDaoInput,
  InewProjectInput,
  EmintInfo,
  INewCollaborationRequest,
};
