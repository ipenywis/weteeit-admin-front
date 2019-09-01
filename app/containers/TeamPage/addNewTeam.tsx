import React from 'react';
import { Card } from 'components/card';
import { Form } from 'components/form';
import { VerticalWrapper } from 'components/verticalWrapper';
import FinalFormSpy from 'finalFormSpy';
import { Button, Intent } from '@blueprintjs/core';
import { FileInput } from 'components/fileInput';
import { InputGroup } from 'components/inputGroup';
import { FormGroup } from 'components/formGroup';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ITeam } from './type';
import { addTeam } from './actions';
import { FormRenderProps } from 'react-final-form';

interface IAddNewTeamDispatchProps {
  addTeam: (team: ITeam) => void;
}
export interface IAddNewTeamProps extends IAddNewTeamDispatchProps {
  header?: string;
  footer?: string;
  name?: string;
  slogan?: string;
}

function validate(values: any) {
  console.warn('Validation is running');
  let errors: any = {};
  if (!values.name || (values.name && values.name.trim() === ''))
    errors.name = 'Name is Required!';
  if (!values.slogan || (values.slogan && values.slogan.trim() === ''))
    errors.slogan = 'Slogan is Required!';
  if (!values.logo || (values.logo && values.logo.trim() === ''))
    errors.logo = 'Logo is Required!';

  console.warn('Validation: ', values, errors);

  return errors;
}

function AddNewTeam(props: IAddNewTeamProps) {
  const { name, slogan, header, footer } = props;

  //TODO: Make Logo as Blob. using string for now
  const onSubmit = (name: string, slogan: string, logo: string) => {
    props.addTeam({ name, slogan, logo } as ITeam);
    //Clear Values
  };

  return (
    <Card large header={header || 'Add New Team'} interactive={true} standalone>
      <Form onSubmit={() => {}} validate={validate}>
        {({
          values,
          form,
          pristine,
          submitting,
          hasValidationErrors,
        }: FormRenderProps) => {
          return (
            <VerticalWrapper>
              <FinalFormSpy form="addNewTeam" />
              <FormGroup label="Name" name="name">
                <InputGroup
                  name="name"
                  placeholder="Name"
                  initialValue={name}
                  disabled={submitting}
                />
              </FormGroup>
              <FormGroup label="Slogan" name="slogan">
                <InputGroup
                  name="slogan"
                  placeholder="Slogan"
                  initialValue={slogan}
                  disabled={submitting}
                />
              </FormGroup>
              <FormGroup label="Logo" name="logo">
                <FileInput
                  name="logo"
                  text="Choose Team logo..."
                  disabled={submitting}
                />
              </FormGroup>
              <Button
                type="submit"
                intent={Intent.PRIMARY}
                disabled={submitting || pristine || hasValidationErrors}
                onClick={() => {
                  onSubmit(values.name, values.slogan, values.logo);
                  form.reset();
                }}
              >
                {footer || 'Add Team'}
              </Button>
            </VerticalWrapper>
          );
        }}
      </Form>
    </Card>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addTeam: (team: ITeam) => dispatch(addTeam(team)),
});

export default connect(
  null,
  mapDispatchToProps,
)(AddNewTeam);
