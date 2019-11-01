import React from 'react';
import ShippingForm from './shippingForm';
import { ApolloClient } from 'apollo-boost';
import { IShipping } from './type';
import { STORE_SHIPPING } from './mutations';
import { AppToaster } from 'components/toaster';
import { Intent } from '@blueprintjs/core';

export interface IAddNewShippingProps {
  apolloClient: ApolloClient<any>;

  loadShippings: (apolloClient: ApolloClient<any>) => void;
}

export default class AddNewShipping extends React.Component<
  IAddNewShippingProps
> {
  showSuccessMessage() {
    AppToaster.show({
      message: 'Shipping Added Successfully',
      intent: Intent.SUCCESS,
      icon: 'tick',
    });
  }

  showErrorMessage() {
    AppToaster.show({
      message: 'Cannot add New Shipping',
      intent: Intent.DANGER,
      icon: 'error',
    });
  }

  async addNewShipping(shipping: IShipping) {
    const storeResponse = await this.props.apolloClient
      .mutate({ mutation: STORE_SHIPPING, variables: { ...shipping } })
      .catch(err => {});

    if (storeResponse && storeResponse.data && storeResponse.data.shipping) {
      this.showSuccessMessage();
      this.props.loadShippings(this.props.apolloClient);
    } else this.showErrorMessage();
  }

  render() {
    return (
      <ShippingForm
        {...this.props}
        name="addShipping"
        header="Add New Shipping Wilaya"
        submitButtonText="Add"
        resetOnSuccessfulSubmit={true}
        onSubmit={this.addNewShipping.bind(this)}
      />
    );
  }
}
