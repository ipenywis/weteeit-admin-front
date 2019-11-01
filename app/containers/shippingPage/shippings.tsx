import React from 'react';
import { createSelector } from 'reselect';
import { makeSelectIsShippingsLoading, makeSelectShippings } from './selectors';
import { Dispatch } from 'redux';
import { IShipping } from './type';
import { connect } from 'react-redux';
import ItemsCard from 'components/ItemsCard';
import { ApolloClient } from 'apollo-boost';

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

  render() {
    const { isShippingsLoading, shippings } = this.props;

    const shippingsItems: { name: string }[] = shippings.map(s => ({
      name: s.wilaya,
      price: s.price,
    }));

    return (
      <ItemsCard
        header="Shipping Wilayas"
        items={shippingsItems}
        loading={isShippingsLoading}
        noItemsMessage="No Shippings to show!"
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
