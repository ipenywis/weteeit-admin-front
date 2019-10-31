import React from 'react';
import { ApolloConsumer } from '@apollo/react-hooks';
import { Alert, Intent } from '@blueprintjs/core';
import { ApolloClient } from 'apollo-boost';
import { ORDER_SHIPPED } from './mutations';
import { IOrder } from './type';
import { AppToaster } from 'components/toaster';

export interface IOrderShippedAlertProps {
  isOpen?: boolean;
  currentItem?: IOrder;

  setIsOpen?: (isOpen: boolean) => void;
  loadOrders: () => void;
}

export function OrderShippedAlert(props: IOrderShippedAlertProps) {
  const { isOpen, setIsOpen, currentItem } = props;

  const errorMessage = () => {
    AppToaster.show({
      message: 'Cannot Confirm Order Shipping! Please try again',
      intent: Intent.DANGER,
      icon: 'error',
    });
    setIsOpen && setIsOpen(false);
  };

  const successMessage = () => {
    AppToaster.show({
      message: 'Order Shipping Confirmed',
      intent: Intent.SUCCESS,
      icon: 'tick',
    });
    setIsOpen && setIsOpen(false);
    //Re-load Orders
    props.loadOrders();
  };

  const handleConfirm = async (client: ApolloClient<any>) => {
    if (currentItem) {
      const updateResult = await client
        .mutate({ mutation: ORDER_SHIPPED, variables: { id: currentItem.id } })
        .catch(err => {
          errorMessage();
        });

      if (updateResult && updateResult.data && updateResult.data.orderShipped)
        successMessage();
      else errorMessage();
    } else errorMessage();
  };

  return (
    <ApolloConsumer>
      {client => {
        return (
          <Alert
            icon="tick-circle"
            isOpen={isOpen}
            cancelButtonText="Cancel"
            confirmButtonText="Confirm"
            intent={Intent.SUCCESS}
            onCancel={() => setIsOpen && setIsOpen(false)}
            onConfirm={() => handleConfirm(client)}
          >
            <p>Confirm Order Shipping?</p>
          </Alert>
        );
      }}
    </ApolloConsumer>
  );
}
