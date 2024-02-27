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
  mint_info: EmintInfo | undefined;
  mint_price: number | undefined;
  avl_wl_spots: number;
  logo_url?: string;
  whitelist_role: string;
  project_logo?: HTMLInputElement;
}
