import * as React from 'react';
import { Form } from 'components/form';
import { Card } from 'components/card';
import { FormGroup, Intent, Button, Divider } from '@blueprintjs/core';
import { IAccountDetails } from './type';
import FinalFormSpy from 'finalFormSpy';
import { InputGroup } from 'components/inputGroup';
import { VerticalWrapper } from 'components/verticalWrapper';

export interface IAccountDetailsProps extends IAccountDetails {}

export default function AccountDetails(props: IAccountDetailsProps) {
  const { password } = props;

  const onSubmit = () => {};

  return (
    <Card header="Account Settings" >
      <Form onSubmit={onSubmit}>
        {({ form, handleSubmit }) => {
          return (
            <VerticalWrapper>
              <FinalFormSpy form="accountsDetails" />
              <FormGroup label="Username" intent={Intent.PRIMARY}>
                <InputGroup name="username" />
              </FormGroup>
              <FormGroup label="Password" intent={Intent.WARNING}>
                <InputGroup name="password" type="password" value={password} />
              </FormGroup>
              <Button
                type="submit"
                icon="confirm"
                intent={Intent.PRIMARY}
                onClick={handleSubmit}
              >
                Update Password
              </Button>
              <Divider />
              <Button intent={Intent.DANGER} icon="delete">
                Delete Account
              </Button>
            </VerticalWrapper>
          );
        }}
      </Form>
    </Card>
  );
}
