import * as React from 'react';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import { HorizontalWrapper } from 'components/horizontalWrapper';
import AddNewTeam from './addNewTeam';
import Teams from './teams';
import { useInjectSaga } from 'utils/injectSaga';
import saga from './saga';

export default function TeamPage() {
  //Register SAGA
  useInjectSaga({ key: 'teamPage', saga: saga });

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
