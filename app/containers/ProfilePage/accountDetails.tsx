import * as React from 'react';
import { Form } from 'components/form';
import { Card } from 'components/card';
import { FormGroup, Intent } from '@blueprintjs/core';
import { IAccountDetails } from './type';
import FinalFormSpy from 'finalFormSpy';
import { InputGroup } from 'components/inputGroup';
import { VerticalWrapper } from 'components/verticalWrapper';

export interface IAccountDetailsProps extends IAccountDetails {}

export default function AccountDetails(props: IAccountDetailsProps) {
  //const { password } = props;

  const onSubmit = () => {};

  return (
    <Card header="Account Settings">
      <Form onSubmit={onSubmit}>
        {({ form, handleSubmit }) => {
          console.log('FORM : ', form);
          return (
            <VerticalWrapper>
              <FinalFormSpy form="accountsDetails" />
              <FormGroup label="Username" intent={Intent.PRIMARY}>
                <InputGroup name="username" small={true} />
              </FormGroup>
              <FormGroup label="Password" intent={Intent.WARNING}>
                <InputGroup name="password" type="password" small={true} />
              </FormGroup>
            </VerticalWrapper>
          );
        }}
      </Form>
    </Card>
  );
}

/*<Form onSubmit={props.handleSubmit}>
            <FormGroup label="Username" intent={Intent.PRIMARY}>
              <InputGroup small={true} />
            </FormGroup>
            <FormGroup label="Password" intent={Intent.WARNING}>
              <InputGroup type="password" value={password} small={true} />
            </FormGroup>
        </Form>*/
