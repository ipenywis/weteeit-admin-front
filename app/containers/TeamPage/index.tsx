import * as React from 'react';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import { HorizontalWrapper } from 'components/horizontalWrapper';
import AddNewTeam from './addNewTeam';
import Teams from './teams';

export default function TeamPage() {
  return (
    <PageContainer>
      <PageHeader header="Team" subHeader="Add Team" />
      <HorizontalWrapper>
        <Teams />
        <AddNewTeam />
      </HorizontalWrapper>
    </PageContainer>
  );
}
