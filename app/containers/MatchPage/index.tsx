import * as React from 'react';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import { HorizontalWrapper } from 'components/horizontalWrapper';
import { MatchForm } from './matchForm';

export default function MatchPage() {
  return (
    <PageContainer>
      <PageHeader header="Match" subHeader="Manage Matches" />
      <HorizontalWrapper>
        <MatchForm header="New Match" />
      </HorizontalWrapper>
    </PageContainer>
  );
}
