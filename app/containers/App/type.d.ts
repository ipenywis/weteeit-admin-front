import { IAppError } from 'types';

export interface IAppState {
  isLoading: boolean;
  error: IAppError | null;
  disableApp: boolean;
}

export interface INavigationState {
  activeNavItem: string;
  activeSubMenu: string | null;
}

export interface INavBarState {
  isSearchBarOpen: boolean;
}
