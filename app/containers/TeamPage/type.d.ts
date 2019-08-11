export interface ITeamPageState {
  currentOpenEdit: string | null;
  currentActiveDeleteAlert: string | null;
  teams: ITeam[];
}

//NOTE: The team DTO is not complete
export interface ITeam {
  name: string;
  logo: string;
  slogan: string;
}
