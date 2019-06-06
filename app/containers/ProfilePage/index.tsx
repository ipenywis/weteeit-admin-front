import * as React from 'react';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import { HorizontalWrapper } from 'components/horizontalWrapper';
import { Card } from 'components/card';

export default function ProfilePage() {
  return (
    <PageContainer>
      <PageHeader header="Profile" subHeader="Edit Info" />
      <HorizontalWrapper spaceBetween={true}>
        <Card header="me">
          <p>Hello World</p>
        </Card>
        <Card header="me">
          <p>Hello World</p>
        </Card>
      </HorizontalWrapper>
    </PageContainer>
  );
}
