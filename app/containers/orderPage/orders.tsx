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
import { OrderShippedAlert } from './orderShippedAlert';

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
    this.loadOrders();
  }

  ordersError() {
    this.props.disableOrdersLoading();
    AppToaster.show({
      message: 'Cannot Load Products, Please Try Again',
      intent: Intent.DANGER,
    });
  }

  async loadOrders() {
    this.props.enableOrdersLoading();

    const ordersResponse = await this.props.apolloClient
      .query({ query: GET_ORDERS })
      .catch(err => {
        console.log('Orders Error: ', err);
      });

    if (ordersResponse) {
      if (ordersResponse.data) {
        this.props.setOrders(ordersResponse.data.orders);
        this.props.disableOrdersLoading();
      }
    } else {
      this.ordersError();
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
        large
        header="Awaiting Orders"
        items={ordersWithInfo}
        noItemsMessage="No Orders on waiting list"
        loading={isOrdersLoading}
        infoCard={<OrderInfo apolloClient={this.props.apolloClient} />}
        customAlert={
          <OrderShippedAlert loadOrders={this.loadOrders.bind(this)} />
        }
        customAlertIcon="tick"
        customAlertIntent="success"
        filterItems={item => !item.shipped}
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
