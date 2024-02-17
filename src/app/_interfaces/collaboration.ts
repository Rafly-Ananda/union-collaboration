export interface INewCollaborationRequest {
  project_id?: string;
  requested_by: string;
  collaboration_type: number | string;
  wl_spot_amt: number;
  wl_team_amt: number;
  method: string;
  note: string;
}

export interface ICollaborationRequest {
  id: string;
  project_id: string;
  collaboration_type: number;
  wl_spot_amt: number;
  wl_team_amt: number;
  note: string;
  method: string;
  collaboration_status: number;
  requested_by: string;
  created_at: string;
  updated_at: string;
  type: string;
  status: string;
  project_name: string;
  guild_id_to: string;
  role_to: string;
  collab_req_from: string;
  guild_id_from: string;
  role_from: string | null;
  discord_id: string;
}
