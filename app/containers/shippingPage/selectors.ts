import { ApplicationRootState } from 'types';
import { createSelector } from 'reselect';

const selectShippingPage = (state: ApplicationRootState) => state.shippingPage;

const makeSelectIsShippingsLoading = () =>
  createSelector(
    selectShippingPage,
    shippingPage => shippingPage.isShippingsLoading,
  );

const makeSelectShippings = () =>
  createSelector(
    selectShippingPage,
    shippingPage => shippingPage.shippings,
  );

export { makeSelectIsShippingsLoading, makeSelectShippings };
