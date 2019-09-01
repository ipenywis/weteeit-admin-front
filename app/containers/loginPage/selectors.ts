import { ApplicationRootState } from 'types';
import { createSelector } from 'reselect';

const selectLogin = (state: ApplicationRootState) => state.login;

const makeSelectLoginError = () =>
  createSelector(
    selectLogin,
    login => login.error,
  );

export { makeSelectLoginError };
