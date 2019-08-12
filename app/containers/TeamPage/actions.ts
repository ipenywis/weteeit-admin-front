import { action } from 'typesafe-actions';
import { ActionTypes } from './constants';
import { ITeam } from './type';

export const openEditPopover = (teamId: string) =>
  action(ActionTypes.OPEN_EDIT_POPOVER, teamId);

export const closeEditPopover = () => action(ActionTypes.CLOSE_EDIT_POPOVER);

export const openDeleteAlert = (teamId: ITeam['id']) =>
  action(ActionTypes.OPEN_DELETE_ALERT, teamId);

export const closeDeleteAlert = () => action(ActionTypes.CLOSE_DELETE_ALERT);

export const loadTeams = () => action(ActionTypes.LOAD_TEAMS);

export const teamsLoadComplete = (teams: ITeam[]) =>
  action(ActionTypes.TEAMS_LOAD_COMPLETE, teams);

export const addTeam = (team: ITeam) => action(ActionTypes.ADD_TEAM, team);

export const removeTeam = (id: ITeam['id']) =>
  action(ActionTypes.REMOVE_TEAM, id);

export const addTeamState = (team: ITeam) =>
  action(ActionTypes.ADD_TEAM_STATE, team);

export const removeTeamState = (id: ITeam['id']) =>
  action(ActionTypes.REMOVE_TEAM_STATE, id);
