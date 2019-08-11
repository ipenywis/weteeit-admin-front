import { ITeamPageState } from './type';
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
  console.info('Running Team Reducer');
  switch (action.type) {
    case ActionTypes.OPEN_DELETE_ALERT:
      return { ...state, currentActiveDeleteAlert: action.payload };
    case ActionTypes.CLOSE_DELETE_ALERT:
      return { ...state, currentActiveDeleteAlert: null };
    case ActionTypes.TEAMS_LOAD_COMPLETE:
      return { ...state, teams: [action.payload] };
    default:
      return state;
  }
}
