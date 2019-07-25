import { ITeamPageState } from './type';
import { IAction } from 'types';
import { ActionTypes } from './constants';

const initialState: ITeamPageState = {
  currentOpenEdit: null,
  currentActiveDeleteAlert: null,
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
    default:
      return state;
  }
}
