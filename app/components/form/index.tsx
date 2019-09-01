import * as React from 'react';
import styled from 'styled-components';
import { Form as FinalForm, FormProps } from 'react-final-form';

const FormContainer = styled.form`
  padding: 5px;
`;

const FinalFormContainer = styled.div``;

export interface IFormProps extends FormProps {
  className?: string;
  children: (...args: any) => JSX.Element | any;
}

/**
 * Use children render props to render Final Form
 * @param props
 */
export function Form(props: IFormProps) {
  return (
    <FinalFormContainer className={props.className}>
      <FinalForm
        {...props}
        render={renderProps => (
          <FormContainer onSubmit={renderProps.handleSubmit}>
            {props.children(renderProps)}
          </FormContainer>
        )}
      />
    </FinalFormContainer>
  );
}
