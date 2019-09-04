import { IAppError } from 'types';

export interface IAppState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: IAppError | null;
  disableApp: boolean;
  apiUrl: string;
  isInitialized: boolean;
}

export interface INavigationState {
  activeNavItem: string;
  activeSubMenu: string | null;
}

export interface INavBarState {
  isSearchBarOpen: boolean;
}
