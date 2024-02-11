import { SERVER_CONFIG } from "../_config/config";
import type { TrimmedUserDiscord, UserDiscordGuild } from "../validator";

export const onAuthCallback = async (
  user: TrimmedUserDiscord,
  guilds: UserDiscordGuild[],
): Promise<void> => {
  try {
    await (
      await fetch(
        `${SERVER_CONFIG.EXTERNAL_API_URL}/auth/discord/callback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user, guilds }),
        },
      )
    ).json();
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(
        `Unrecoverable error on auth callback call, ${e.message}`,
      );
    }
  }
};
