import { ApplicationRootState } from 'types';
import { createSelector } from 'reselect';

const selectLogin = (state: ApplicationRootState) => state.login;
const selectLoginForm = (state: ApplicationRootState) =>
  state.finalForm.loginForm;

const makeSelectLoginError = () =>
  createSelector(
    selectLogin,
    login => login.error,
  );

export { makeSelectLoginError, selectLoginForm };
