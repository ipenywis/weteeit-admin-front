import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';

const selectProductPage = (state: ApplicationRootState) => state.productPage;

const makeSelectIsLoading = () =>
  createSelector(
    selectProductPage,
    productPage => productPage.isLoading,
  );

export { makeSelectIsLoading };
