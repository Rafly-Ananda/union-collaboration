export enum EWhitelistType {
  general_wl = "general-wl",
  team_wl = "team_wl",
}

export interface InewWhitelistInput {
  whitelist_type: string;
  whitelisted_user: string;
}
