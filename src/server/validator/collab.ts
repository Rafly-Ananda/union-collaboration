import { z } from "zod";

export const CollabValidator = z.object({
  id: z.string(),
  project_id: z.string(),
  collaboration_type: z.number(),
  wl_spot_amt: z.number(),
  wl_team_amt: z.number(),
  note: z.string(),
  method: z.string(),
  collaboration_status: z.number(),
  requested_by: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  type: z.string(),
  status: z.string(),
  project_name: z.string(),
  guild_id_to: z.string(),
  role_to: z.string(),
  collab_req_from: z.string(),
  guild_id_from: z.string(),
  role_from: z.string().nullable(),
  discord_id: z.string(),
});

export const CollabInputValidator = z.object({
  project_id: z.string(),
  requested_by: z.string(),
  collaboration_type: z.number(),
  wl_spot_amt: z.number(),
  wl_team_amt: z.number(),
  method: z.string(),
  note: z.string(),
});
