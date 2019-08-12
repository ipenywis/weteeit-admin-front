export interface ITeamPageState {
  currentOpenEdit: string | null;
  currentActiveDeleteAlert: ITeam['id'] | null;
  teams: ITeam[];
}

//NOTE: The team DTO is not complete
export interface ITeam {
  id: number;
  name: string;
  logo: string;
  slogan: string;
}
