import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';

const selectRoute = (state: ApplicationRootState) => state.router;
const selectNavigation = (state: ApplicationRootState) => state.navigation;

const makeSelectLocation = () =>
  createSelector(
    selectRoute,
    routeState => routeState.location,
  );

const makeNavActiveItem = () =>
  createSelector(
    selectNavigation,
    navigation => navigation.activeNavItem,
  );

export { makeSelectLocation, makeNavActiveItem };
