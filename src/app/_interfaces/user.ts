export interface IUser {
  id: string;
  discord_id: string;
  username: string;
  discriminator: string;
  avatar: string;
}

export interface IUserGuilds {
  id: string;
  discord_id: string;
  username: string;
  discriminator: string;
  avatar: string;
  is_project: boolean;
  is_dao: boolean;
  created_at: string;
  updated_at: string;
  guild_id: string;
  guild_name: string;
}

export interface IUserGuildRoles {
  server: string;
  roles: string[];
}
