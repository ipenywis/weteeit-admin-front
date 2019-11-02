import React from 'react';
import { IShipping } from './type';
import { ApolloClient } from 'apollo-boost';
import { Alert, Intent } from '@blueprintjs/core';
import { ApolloConsumer } from '@apollo/react-hooks';
import { AppToaster } from 'components/toaster';
import { DELETE_SHIPPING } from './mutations';

export interface IDeleteShippingAlertProps {
  /**
   * this props Will automatically gets passed into this component from ItemCard
   */
  isOpen?: boolean;
  currentItem?: any;
  setIsOpen?: (isOpen: boolean) => void;

  loadShippings: () => void;
}

export function DeleteShippingAlert(props: IDeleteShippingAlertProps) {
  let { isOpen, setIsOpen, currentItem } = props;

  //Map currentItem properties
  currentItem = {
    wilaya: currentItem.name,
    id: currentItem.id,
    price: currentItem.price,
  } as IShipping;

  const handleCancel = () => {
    setIsOpen && setIsOpen(false);
  };

  const deleteError = () => {
    currentItem &&
      AppToaster.show({
        message: 'Cannot Delete shipping wilaya, please reload and try again',
        intent: Intent.DANGER,
        icon: 'error',
      });
  };

  const deleteSuccess = () => {
    currentItem &&
      AppToaster.show({
        message: `${currentItem.wilaya} Shipping wilaya Deleted Successfully!`,
        intent: Intent.SUCCESS,
        icon: 'tick',
      });
  };

  const handleConfirm = async (apolloClient: ApolloClient<any>) => {
    const deleteResponse = await apolloClient
      .mutate({
        mutation: DELETE_SHIPPING,
        variables: { id: currentItem && currentItem.id },
      })
      .catch(err => {});

    if (deleteResponse && deleteResponse.data && deleteResponse.data.deleted) {
      deleteSuccess();
      props.loadShippings();
    } else deleteError();
  };

  return (
    <ApolloConsumer>
      {client => (
        <Alert
          isOpen={isOpen}
          cancelButtonText="Cancel"
          confirmButtonText="Delete"
          icon="trash"
          intent={Intent.DANGER}
          onCancel={handleCancel}
          onConfirm={() => handleConfirm(client)}
        >
          <p>
            Are you sure Completely want to{' '}
            <b>Delete {currentItem && currentItem.wilaya} Shipping Wilaya?</b>
          </p>
        </Alert>
      )}
    </ApolloConsumer>
  );
}
