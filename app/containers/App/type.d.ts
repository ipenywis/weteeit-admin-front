import { IAppError } from 'types';
import { IAuthAdmin } from 'containers/loginPage/type';

export interface IAppState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: IAppError | null;
  disableApp: boolean;
  apiUrl: string;
  isInitialized: boolean;
  authAdmin: IAuthAdmin | null;
}

export interface INavigationState {
  activeNavItem: string;
  activeSubMenu: string | null;
}

export interface INavBarState {
  isSearchBarOpen: boolean;
}
