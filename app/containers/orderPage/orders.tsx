import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ItemsCard from 'components/ItemsCard';
import { ProductTypes } from 'containers/productPage/type';
import { createSelector } from 'reselect';
import { makeSelectOrders, makeSelectIsOrdersLoading } from './selectors';
import { IOrder } from './type';
import { ApolloClient } from 'apollo-boost';
import { GET_ORDERS } from './queries';
import { AppToaster } from 'components/toaster';
import { Intent } from '@blueprintjs/core';
import {
  setOrders,
  enableOrdersLoading,
  disableOrdersLoading,
} from './actions';
import { makeSelectActiveProductType } from 'containers/productPage/selectors';
import OrderInfo from './orderInfo';

export interface IOrdersProps {
  apolloClient: ApolloClient<any>;
}

interface IOrdersDispatch {
  setOrders: (orders: IOrder[]) => void;
  enableOrdersLoading: () => void;
  disableOrdersLoading: () => void;
}

interface IOrdersState {
  orders: IOrder[];
  isOrdersLoading: boolean;
  activeProductType: ProductTypes;
}

class Orders extends React.Component<
  IOrdersProps & IOrdersState & IOrdersDispatch
> {
  componentDidMount() {
    console.log('Loading Orders');
    this.loadOrders();
  }

  async loadOrders() {
    this.props.enableOrdersLoading();

    const ordersResponse = await this.props.apolloClient
      .query({ query: GET_ORDERS })
      .catch(err => {
        this.props.disableOrdersLoading();
        AppToaster.show({
          message: 'Cannot Load Products, Please Try Again',
          intent: Intent.DANGER,
        });
      });

    console.log('Orders Response: ', ordersResponse);

    if (ordersResponse) {
      if (ordersResponse.data) {
        this.props.setOrders(ordersResponse.data.orders);
        this.props.disableOrdersLoading();
      }
    }
  }

  render() {
    const { orders, isOrdersLoading } = this.props;

    const ordersWithInfo = orders
      ? orders.map((order, idx) => {
          const name = `Order ${idx + 1}`;
          return { ...order, name };
        })
      : [];

    return (
      <ItemsCard
        header="Awaiting Orders"
        items={ordersWithInfo}
        noItemsMessage="No Orders Found"
        loading={isOrdersLoading}
        infoCard={<OrderInfo apolloClient={this.props.apolloClient} />}
      />
    );
  }
}

const mapStateToProps = createSelector(
  makeSelectOrders(),
  makeSelectIsOrdersLoading(),
  makeSelectActiveProductType(),
  (orders, isOrdersLoading, activeProductType): IOrdersState => ({
    orders,
    isOrdersLoading,
    activeProductType,
  }),
);

const mapDispatchToProps = (dispatch: Dispatch): IOrdersDispatch => ({
  setOrders: (orders: IOrder[]) => dispatch(setOrders(orders)),
  enableOrdersLoading: () => dispatch(enableOrdersLoading()),
  disableOrdersLoading: () => dispatch(disableOrdersLoading()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Orders);
