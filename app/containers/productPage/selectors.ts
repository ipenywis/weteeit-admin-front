import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';

const selectProductPage = (state: ApplicationRootState) => state.productPage;

const makeSelectProducts = () =>
  createSelector(
    selectProductPage,
    productPage => productPage.products,
  );

const makeSelectIsLoading = () =>
  createSelector(
    selectProductPage,
    productPage => productPage.isLoading,
  );

const makeSelectActiveProductType = () =>
  createSelector(
    selectProductPage,
    productPage => productPage.activeProductType,
  );

export { makeSelectProducts, makeSelectIsLoading, makeSelectActiveProductType };
