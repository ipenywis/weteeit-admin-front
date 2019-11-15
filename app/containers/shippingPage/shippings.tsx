import React from 'react';
import { createSelector } from 'reselect';
import { makeSelectIsShippingsLoading, makeSelectShippings } from './selectors';
import { Dispatch } from 'redux';
import { IShipping } from './type';
import { connect } from 'react-redux';
import ItemsCard from 'components/ItemsCard';
import { ApolloClient } from 'apollo-boost';
import ShippingForm from './shippingForm';
import { UPDATE_SHIPPING } from './mutations';
import { AppToaster } from 'components/toaster';
import { Intent } from '@blueprintjs/core';
import { DeleteShippingAlert } from './deleteShippingAlert';

export interface IShippingsProps {
  apolloClient: ApolloClient<any>;

  loadShippings: (apolloClient: ApolloClient<any>) => void;
}

interface IShippingsDispatchProps {}

interface IShippingsState {
  isShippingsLoading: boolean;
  shippings: IShipping[];
}

class Shippings extends React.Component<
  IShippingsProps & IShippingsDispatchProps & IShippingsState
> {
  componentDidMount() {
    this.props.loadShippings(this.props.apolloClient);
  }

  showSuccessMessage() {
    AppToaster.show({
      message: 'Shipping Info updated Successfully',
      intent: Intent.SUCCESS,
      icon: 'tick',
    });
  }

  showErrorMessage() {
    AppToaster.show({
      message: 'Cannot update shipping info',
      intent: Intent.DANGER,
      icon: 'error',
    });
  }

  async updateShipping(shipping: IShipping) {
    const updateResponse = await this.props.apolloClient
      .mutate({ mutation: UPDATE_SHIPPING, variables: { ...shipping } })
      .catch(err => {});

    if (
      updateResponse &&
      updateResponse.data &&
      updateResponse.data.shippingUpdated
    ) {
      this.showSuccessMessage();
      this.props.loadShippings(this.props.apolloClient);
    } else this.showErrorMessage();
  }

  render() {
    const { isShippingsLoading, shippings, apolloClient } = this.props;

    const shippingsItems: {
      name: string;
      id?: number;
      price: number;
    }[] = shippings.map(s => ({
      id: s.id,
      name: s.wilaya,
      price: s.price,
    }));

    return (
      <ItemsCard
        large
        header="Shipping Wilayas"
        items={shippingsItems}
        loading={isShippingsLoading}
        noItemsMessage="No Shippings to show!"
        updateCard={
          <ShippingForm
            apolloClient={apolloClient}
            name="updateShipping"
            header="Update Shipping"
            elevated
            submitButtonText="Update"
            showCloseButton
            resetOnSuccessfulSubmit={false}
            onSubmit={this.updateShipping.bind(this)}
          />
        }
        deleteAlert={
          <DeleteShippingAlert
            loadShippings={() =>
              this.props.loadShippings(this.props.apolloClient)
            }
          />
        }
      />
    );
  }
}

const mapStateToProps = () =>
  createSelector(
    makeSelectIsShippingsLoading(),
    makeSelectShippings(),
    (isShippingsLoading, shippings): IShippingsState => ({
      isShippingsLoading,
      shippings,
    }),
  );

const mapDispatchToProps = (
  dispatch: Dispatch,
): IShippingsDispatchProps => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Shippings);
