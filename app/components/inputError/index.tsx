import React from 'react';
import { Field } from 'react-final-form';
import styled from 'styled-components';

export interface IInputErrorProps {
  name: string;
}

const ErrorContainer = styled.span`
  display: flex;
  justify-content: flex-start;
`;

export function InputError(props: IInputErrorProps) {
  const { name } = props;

  return (
    <Field
      name={name}
      subscription={{ error: true, touched: true }}
      render={({ meta: { error, touched } }) =>
        touched && error ? <ErrorContainer>{error}</ErrorContainer> : null
      }
    />
  );
}
