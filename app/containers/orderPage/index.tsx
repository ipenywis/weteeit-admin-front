import React from 'react';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import Orders from './orders';
import { ApolloConsumer } from '@apollo/react-hooks';

interface IOrderPageProps {}

export class OrderPage extends React.Component<IOrderPageProps> {
  render() {
    return (
      <ApolloConsumer>
        {client => (
          <PageContainer>
            <PageHeader header="Orders" subHeader="Manage Orders" />
            <Orders apolloClient={client} />
          </PageContainer>
        )}
      </ApolloConsumer>
    );
  }
}
