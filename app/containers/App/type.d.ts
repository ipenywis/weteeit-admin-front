export interface IAppState {
  isLoading: boolean;
  error: string | null;
}

export interface INavigationState {
  activeNavItem: string;
  activeSubMenu: string | null;
}

export interface INavBarState {
  isSearchBarOpen: boolean;
}
