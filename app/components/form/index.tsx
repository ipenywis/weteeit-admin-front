import * as React from 'react';
import styled from 'styled-components';
import {
  Form as FinalForm,
  FormProps,
  FormRenderProps,
} from 'react-final-form';

const FormContainer = styled.form`
  padding: 5px;
`;

const FinalFormContainer = styled.div``;

export interface IFormProps extends FormProps {
  className?: string;
  formRef?: React.LegacyRef<HTMLFormElement>;
  resetOnSuccessfulSubmit?: boolean;

  children: (...args: any) => JSX.Element | any;
}

/**
 * Use children render props to render Final Form
 * @param props
 */
function Form(props: IFormProps) {
  const { resetOnSuccessfulSubmit } = props;

  return (
    <FinalFormContainer className={props.className}>
      <FinalForm
        {...props}
        render={(renderProps: FormRenderProps) => (
          <FormContainer
            onSubmit={event =>
              resetOnSuccessfulSubmit
                ? (renderProps.handleSubmit(event) as Promise<any>).then(
                    renderProps.form.reset,
                  )
                : renderProps.handleSubmit(event)
            }
            ref={props.formRef as any}
          >
            {props.children(renderProps)}
          </FormContainer>
        )}
      />
    </FinalFormContainer>
  );
}

Form.defaultProps = {
  resetOnSuccessfulSubmit: true,
};

export { Form };
