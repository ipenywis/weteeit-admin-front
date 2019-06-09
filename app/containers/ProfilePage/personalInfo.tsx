import * as React from 'react';
import { Form } from 'components/form';
import { Card } from 'components/card';
import { FormGroup, Intent } from '@blueprintjs/core';
import { DateInput, IDateFormatProps } from '@blueprintjs/datetime';
import '../../../node_modules/@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import { IPersonalInfo } from './type';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { InputGroup } from 'components/inputGroup';
import { VerticalWrapper } from 'components/verticalWrapper';

export interface IPersonalInfoProps extends IPersonalInfo {}

function PersonalInfo(props: IPersonalInfoProps) {
  const { username, email, fullName, birthDate, phoneNumber } = props;

  const jsDateFormatter: IDateFormatProps = {
    formatDate: date => date.toLocaleDateString(),
    parseDate: str => new Date(str),
    placeholder: 'MM/DD/YYYY',
  };

  const onSubmit = () => {};

  return (
    <Card header="Personal Info">
      <Form onSubmit={onSubmit}>
        {() => (
          <VerticalWrapper>
            <FormGroup label="Username" intent={Intent.PRIMARY}>
              <InputGroup name="username" value={username} />
            </FormGroup>
            <FormGroup label="Full Name" intent={Intent.PRIMARY}>
              <InputGroup name="email" value={fullName} small={true} />
            </FormGroup>
            <FormGroup label="Email" intent={Intent.PRIMARY}>
              <InputGroup name="email" value={email} small={true} />
            </FormGroup>
            <FormGroup label="Phone Number" intent={Intent.PRIMARY}>
              <InputGroup name="phoneNumber" value={phoneNumber} small={true} />
            </FormGroup>
            <FormGroup label="Birth Date" intent={Intent.PRIMARY}>
              <DateInput {...jsDateFormatter} defaultValue={birthDate} />
            </FormGroup>
          </VerticalWrapper>
        )}
      </Form>
    </Card>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({});

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PersonalInfo);
