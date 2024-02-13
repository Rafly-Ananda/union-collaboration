export enum EmintInfo {
  PRE = "pre",
  DAO = "dao",
  POST = "post",
}

export interface InewProjectInput {
  type?: string;
  project_name: string;
  description: string;
  mint_date?: string;
  supply: number;
  website: string;
  discord: string;
  twitter: string;
  mint_info: EmintInfo;
  avl_wl_spots: number;
  logo_url?: string;
  whitelist_role: string;
  project_logo?: HTMLInputElement;
}
