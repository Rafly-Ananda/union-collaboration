import { SERVER_CONFIG } from "../_config/config";
import type {
  TrimmedUserDiscord,
  UserDiscordGuild,
  UserExternal,
} from "../validator";
import { UserExternalResponseValidator } from "../validator";

interface onDiscordCallback {
  data: {
    user: UserExternal;
  };
}

export const onAuthCallback = async (
  user: TrimmedUserDiscord,
  guilds: UserDiscordGuild[],
): Promise<UserExternal> => {
  try {
    const r = (await (
      await fetch(`${SERVER_CONFIG.EXTERNAL_API_URL}/auth/discord/callback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, guilds }),
      })
    ).json()) as onDiscordCallback;

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

// {
//   discord_id: '329291356151218177',
//   username: 'kayzeel',
//   discriminator: '0',
//   avatar: '35b506bd3e56feffa555946fdaf55bc6',
//   is_project: true,
//   is_dao: true,
//   id: '8a847e88-e1c6-4799-a118-5a505571575f'
// }

// {
//   id: '8a847e88-e1c6-4799-a118-5a505571575f',
//   discord_id: '329291356151218177',
//   username: 'kayzeel',
//   discriminator: '0',
//   avatar: '35b506bd3e56feffa555946fdaf55bc6',
//   is_project: true,
//   is_dao: true,
//   created_at: '2024-02-15T11:59:47.985Z',
//   updated_at: '2024-02-15T11:59:47.985Z'
// }
