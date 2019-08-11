import React from 'react';
//import styled from 'styled-components';
import { Card } from 'components/card';
import { VerticalWrapper } from 'components/verticalWrapper';
import { Form } from 'components/form';
import FinalFormSpy from '../../finalFormSpy';
import { FormGroup } from '@blueprintjs/core';
import { DateTimeInput } from 'components/dateTimeInput';
import { InputGroup } from 'components/inputGroup';

export interface IMatchFormProps {
  header: string;
}

export function MatchForm(props: IMatchFormProps) {
  const { header } = props;

  const onSubmit = () => {
    //TODO: Add data submission
  };

  return (
    <Card large header={header} interactive={true} standalone>
      <Form onSubmit={onSubmit}>
        {() => {
          return (
            <VerticalWrapper>
              <FinalFormSpy form="matchForm" />
              <FormGroup label="Team1">
                <InputGroup name="team1" placeholder="Team1" />
              </FormGroup>
              <FormGroup label="Team2">
                <InputGroup name="team2" placeholder="Team2" />
              </FormGroup>
              <FormGroup label="Match Date">
                <DateTimeInput name="date" initialValue="" />
              </FormGroup>
            </VerticalWrapper>
          );
        }}
      </Form>
    </Card>
  );
}
