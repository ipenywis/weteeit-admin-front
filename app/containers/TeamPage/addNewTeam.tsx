import React from 'react';
import { Card } from 'components/card';
import { Form } from 'components/form';
import { VerticalWrapper } from 'components/verticalWrapper';
import FinalFormSpy from 'finalFormSpy';
import { FormGroup, Button, Intent } from '@blueprintjs/core';
import { FileInput } from 'components/fileInput';
import { InputGroup } from 'components/inputGroup';
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

function AddNewTeam(props: IAddNewTeamProps) {
  const { name, slogan, header, footer } = props;

  //TODO: Make Logo as Blob. using string for now
  const onSubmit = (name: string, slogan: string, logo: string) => {
    props.addTeam({ name, slogan, logo } as ITeam);
    //Clear Values
  };

  return (
    <Card large header={header || 'Add New Team'} interactive={true} standalone>
      <Form onSubmit={() => {}}>
        {({ values, form }: FormRenderProps) => {
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
                <FileInput name="logo" text="Choose Team logo..." />
              </FormGroup>
              <Button
                type="submit"
                intent={Intent.PRIMARY}
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
