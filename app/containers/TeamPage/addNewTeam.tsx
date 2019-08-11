import React from 'react';
import { Card } from 'components/card';
import { Form } from 'components/form';
import { VerticalWrapper } from 'components/verticalWrapper';
import FinalFormSpy from 'finalFormSpy';
import { FormGroup, Button, Intent, FileInput } from '@blueprintjs/core';
import { InputGroup } from 'components/inputGroup';

export interface IAddNewTeamProps {
  header?: string;
  footer?: string;
  name?: string;
  slogan?: string;
}

export default function AddNewTeam(props: IAddNewTeamProps) {
  const { name, slogan, header, footer } = props;

  const onSubmit = () => {};

  const onSelectLogoFile = () => {};

  return (
    <Card large header={header || 'Add New Team'} interactive={true} standalone>
      <Form onSubmit={onSubmit}>
        {() => {
          return (
            <VerticalWrapper>
              <FinalFormSpy form="addNewTeam" />
              <FormGroup label="Name">
                <InputGroup
                  name="name"
                  placeholder="Name"
                  initialValue={name}
                />
              </FormGroup>
              <FormGroup label="Slogan">
                <InputGroup
                  name="slogan"
                  placeholder="Slogan"
                  initialValue={slogan}
                />
              </FormGroup>
              <FormGroup label="Logo">
                <FileInput
                  text="Choose Team logo..."
                  onInputChange={onSelectLogoFile}
                />
              </FormGroup>
              <Button type="submit" intent={Intent.PRIMARY}>
                {footer || 'Add Team'}
              </Button>
            </VerticalWrapper>
          );
        }}
      </Form>
    </Card>
  );
}
