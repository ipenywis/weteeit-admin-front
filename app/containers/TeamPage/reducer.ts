import { ITeamPageState, ITeam } from './type';
import { IAction } from 'types';
import { ActionTypes } from './constants';

const initialState: ITeamPageState = {
  currentOpenEdit: null,
  currentActiveDeleteAlert: null,
  teams: [],
};

export default function TeamReducer(
  state: ITeamPageState = initialState,
  action: IAction,
): ITeamPageState {
  switch (action.type) {
    case ActionTypes.OPEN_DELETE_ALERT:
      return { ...state, currentActiveDeleteAlert: action.payload };
    case ActionTypes.CLOSE_DELETE_ALERT:
      return { ...state, currentActiveDeleteAlert: null };
    case ActionTypes.TEAMS_LOAD_COMPLETE:
      return { ...state, teams: action.payload };
    case ActionTypes.ADD_TEAM_STATE:
      return { ...state, teams: [...state.teams, action.payload as ITeam] };
    case ActionTypes.REMOVE_TEAM_STATE:
      return {
        ...state,
        teams: state.teams.filter(
          t => t.id !== (action.payload as ITeam['id']),
        ),
      };
    default:
      return state;
  }
}
