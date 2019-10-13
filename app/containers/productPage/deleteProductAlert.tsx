import React from 'react';
import { Alert, Intent } from '@blueprintjs/core';
import { ApolloClient } from 'apollo-boost';
import { ApolloConsumer } from '@apollo/react-hooks';
import { DELETE_PRODUCT } from './mutations';
import { IProduct } from './type';
import { AppToaster } from 'components/toaster';

export interface IDeleteProductProps {
  isOpen?: boolean;
  currentItem?: IProduct;

  setIsOpen?: (isOpen: boolean) => void;
  loadProducts: () => void;
}

export function DeleteProductAlert(props: IDeleteProductProps) {
  const { isOpen, setIsOpen, currentItem } = props;

  const handleCancel = () => {
    setIsOpen && setIsOpen(false);
  };

  const deleteError = () => {
    currentItem &&
      AppToaster.show({
        message: `Cannot Delete ${currentItem.name} Product`,
        intent: Intent.DANGER,
      });
  };

  const deleteSuccess = () => {
    currentItem &&
      AppToaster.show({
        message: `Product ${currentItem.name} Deleted Successfully`,
        intent: Intent.SUCCESS,
      });
    //Re-Fetch the products
    console.log('Re-fetching products');
    props.loadProducts();
  };

  const handleConfirm = async (apolloClient: ApolloClient<any>) => {
    if (currentItem) {
      setIsOpen && setIsOpen(false);
      const deleteResponse = await apolloClient
        .mutate({
          mutation: DELETE_PRODUCT,
          variables: { name: currentItem.name },
        })
        .catch(err => {
          deleteError();
        });

      if (deleteResponse) {
        if (deleteResponse.data) deleteSuccess();
        else deleteError();
      }
    }
  };

  return (
    <ApolloConsumer>
      {(client: ApolloClient<any>) => (
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
            Are you sure you Completely want to <b>Delete Selected Product?</b>
          </p>
        </Alert>
      )}
    </ApolloConsumer>
  );
}
