import { ApplicationRootState } from 'types';
import { createSelector } from 'reselect';

const selectTeam = (state: ApplicationRootState) => state.teamPage;

const makeSelectCurrentOpenEditPopover = () =>
  createSelector(
    selectTeam,
    team => team.currentOpenEdit,
  );

const makeSelectCurrentActiveDeleteAlert = () =>
  createSelector(
    selectTeam,
    team => team.currentActiveDeleteAlert,
  );

const makeSelectTeams = () =>
  createSelector(
    selectTeam,
    teamPage => teamPage.teams,
  );

export {
  makeSelectCurrentOpenEditPopover,
  makeSelectCurrentActiveDeleteAlert,
  makeSelectTeams,
};
