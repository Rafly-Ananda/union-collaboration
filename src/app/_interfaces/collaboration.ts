export interface INewCollaborationRequest {
  project_id?: string;
  requested_by: string;
  collaboration_type: number | string;
  wl_spot_amt: number;
  wl_team_amt: number;
  method: string;
  note: string;
}
