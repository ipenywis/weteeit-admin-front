import React from 'react';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Shippings from './shippings';
import { ApolloConsumer } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-boost';
import { GET_SHIPPINGS } from './queries';
import {
  setShippingsLoading,
  clearShippingsLoading,
  setShippings,
} from './actions';
import { IShipping } from './type';
import { AppToaster } from 'components/toaster';
import { Intent } from '@blueprintjs/core';
import AddNewShipping from './addNewShipping';

export interface IShippingPageProps {}

interface IShippingPageDispatchProps {
  setShippings: (shippings: IShipping[]) => void;
  setShippingsLoading: () => void;
  clearShippingsLoading: () => void;
}

interface IShippingPageState {}

function ShippingPage(
  props: IShippingPageProps & IShippingPageDispatchProps & IShippingPageState,
) {
  const showErrorMessage = () => {
    AppToaster.show({
      message: 'Cannot Load Shippings',
      intent: Intent.DANGER,
    });
  };

  const loadShippings = async (apolloClient: ApolloClient<any>) => {
    //Start loading
    props.setShippingsLoading();

    const shippingsResponse = await apolloClient
      .query({ query: GET_SHIPPINGS })
      .catch(err => {});

    if (
      shippingsResponse &&
      shippingsResponse.data &&
      shippingsResponse.data.shippings &&
      shippingsResponse.data.shippings.length > 0
    ) {
      props.setShippings(shippingsResponse.data.shippings);
      //Stop loading
      props.clearShippingsLoading();
    } else {
      props.clearShippingsLoading();
      showErrorMessage();
    }
  };

  return (
    <ApolloConsumer>
      {client => (
        <PageContainer>
          <PageHeader header="Shipping Info" subHeader="Manage Shipping" />
          <Shippings apolloClient={client} loadShippings={loadShippings} />
          <AddNewShipping apolloClient={client} loadShippings={loadShippings} />
        </PageContainer>
      )}
    </ApolloConsumer>
  );
}

const mapStateToProps = () => {};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setShippings: (shippings: IShipping[]) => dispatch(setShippings(shippings)),
  setShippingsLoading: () => dispatch(setShippingsLoading()),
  clearShippingsLoading: () => dispatch(clearShippingsLoading()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShippingPage);
