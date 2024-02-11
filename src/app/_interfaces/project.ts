export enum EmintInfo {
  preMint = "pre_mint",
  postMint = "post_mint",
}

export interface InewProjectInput {
  discord_server: string;
  description: string;
  whitelist_role: string;
  mint_info: EmintInfo;
  mint_date: string;
  supply: number;
  available_wl_spot: number;
  discord_link: string;
  x_link: string;
  web_link: string;
  project_logo: HTMLInputElement;
}
