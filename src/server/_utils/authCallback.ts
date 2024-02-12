import { SERVER_CONFIG } from "../_config/config";
import type {
  TrimmedUserDiscord,
  UserDiscordGuild,
  UserExternal,
} from "../validator";
import { UserExternalResponseValidator } from "../validator";

export const onAuthCallback = async (
  user: TrimmedUserDiscord,
  guilds: UserDiscordGuild[],
): Promise<UserExternal> => {
  try {
    const r = await (
      await fetch(`${SERVER_CONFIG.EXTERNAL_API_URL}/auth/discord/callback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, guilds }),
      })
    ).json();

    const vRes = UserExternalResponseValidator.safeParse(r.data.user);
    if (!vRes.success) {
      throw new Error("Failed z validating user external");
    }

    return vRes.data;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Error on auth callback call, ${e.message}`);
    }
    // Typescript Sheananigans
    throw new Error(`Unrecoverable error fetching user discord details`);
  }
};
