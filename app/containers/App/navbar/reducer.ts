import { INavBarState } from '../type';
import { IAction } from 'types';
import { ActionTypes } from '../constants';

export const initialState: INavBarState = {
  isSearchBarOpen: false,
};

function NavBarReducer(state: INavBarState = initialState, action: IAction) {
  switch (action.type) {
    case ActionTypes.OPEN_SEARCH_BAR:
      return { ...state, isSearchBarOpen: true };
    case ActionTypes.CLOSE_SEARCH_BAR:
      return { ...state, isSearchBarOpen: false };
    default:
      return state;
  }
}

export default NavBarReducer;
