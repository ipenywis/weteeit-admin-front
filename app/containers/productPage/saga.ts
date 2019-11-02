import ApolloClient from 'apollo-boost';
import { GET_PRODUCTS_BY_TYPE } from './queries';
import { AppToaster } from 'components/toaster';
import { put, call } from 'redux-saga/effects';
import {
  disableGlobalLoading,
  activateGlobalLoading,
} from 'containers/App/actions';
import { Intent } from '@blueprintjs/core';
import { IProductsProps } from './products';

export function* loadProducts(apolloClient: ApolloClient<any>) {
  put(activateGlobalLoading());

  const queryVariables = {
    type: 'tshirt',
  };

  try {
    const productsWithDefaultType = yield call(apolloClient.query, {
      query: GET_PRODUCTS_BY_TYPE,
      variables: queryVariables,
    });
    console.log('Response: ', productsWithDefaultType);
  } catch (err) {
    put(disableGlobalLoading());
    AppToaster.show({
      message: 'Error, Cannot Load Products at the moment',
      intent: Intent.DANGER,
    });
  }
}

export default function* rootSaga({ apolloClient }: IProductsProps) {
  call(loadProducts, apolloClient);
}
