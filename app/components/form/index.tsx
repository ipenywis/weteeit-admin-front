import * as React from 'react';
import styled from 'styled-components';
import { Form as FinalForm, FormProps } from 'react-final-form';

const FormContainer = styled.form`
  padding: 5px;
`;

export interface IFormProps extends FormProps {
  children: (...args: any) => JSX.Element | any;
}

/**
 * Use children render props to render Final Form
 * @param props
 */
export function Form(props: IFormProps) {
  return (
    <FinalForm
      onSubmit={props.onSubmit}
      render={renderProps => (
        <FormContainer onSubmit={renderProps.handleSubmit}>
          {props.children(renderProps)}
        </FormContainer>
      )}
    />
  );
}
