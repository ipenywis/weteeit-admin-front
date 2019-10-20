import { ApplicationRootState } from 'types';
import { createSelector } from 'reselect';

const makeSelectOrderPage = (state: ApplicationRootState) => state.orderPage;

const makeSelectOrders = () =>
  createSelector(
    makeSelectOrderPage,
    orderPage => orderPage.orders,
  );

const makeSelectIsOrdersLoading = () =>
  createSelector(
    makeSelectOrderPage,
    orderPage => orderPage.isOrdersLoading,
  );

export { makeSelectOrders, makeSelectIsOrdersLoading };
