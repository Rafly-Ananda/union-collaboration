import { SERVER_CONFIG } from "../_config/config";
import {
  userDiscordResponseValidator,
  DiscordGuildResponseValidator,
} from "../validator";
import type { TrimmedUserDiscord, UserDiscordGuild } from "../validator";

export const getUserDetails = async (
  token: string,
): Promise<TrimmedUserDiscord> => {
  try {
    const r = await (
      await fetch(`${SERVER_CONFIG.DISCORD_API_URL}/users/@me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
    ).json();

    const vRes = userDiscordResponseValidator.safeParse(r);
    if (!vRes.success) {
      throw new Error("Failed z validating user discord");
    }

    const { id, username, avatar, discriminator } = vRes.data;

    return {
      id,
      username,
      avatar,
      discriminator,
    };
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Error fetching user discord details, ${e.message}`);
    }
    // Typescript Sheananigans
    throw new Error(`Unrecoverable error fetching user discord details`);
  }
};

export const getUserGuildDetails = async (
  token: string,
): Promise<UserDiscordGuild[]> => {
  try {
    const r = await (
      await fetch(`${SERVER_CONFIG.DISCORD_API_URL}/users/@me/guilds`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
    ).json();

    const vRes = DiscordGuildResponseValidator.safeParse(r.at(0));
    if (!vRes.success) {
      throw new Error("Failed z validating discord guilds");
    }

    return [...r];
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Error fetching discord guild details, ${e.message}`);
    }
    // Typescript Sheananigans
    throw new Error(`Unrecoverable error fetching discord guild details`);
  }
};
