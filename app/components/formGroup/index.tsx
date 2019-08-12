import React from 'react';
import {
  FormGroup as BFormGroup,
  IFormGroupProps as IBFormGroupProps,
  Intent,
} from '@blueprintjs/core';
import { Field } from 'react-final-form';

export interface IFormGroupProps extends IBFormGroupProps {
  name?: string;
  children?: any | any[];
}

function FormGroup(props: IFormGroupProps) {
  const primitiveFormGroup = <BFormGroup>{props.children}</BFormGroup>;

  if (props.name)
    return (
      <Field name={props.name}>
        {({ meta: { error, touched } }) =>
          React.cloneElement(primitiveFormGroup, {
            ...props,
            intent: touched && error ? Intent.DANGER : props.intent,
            helperText: touched && error ? error : props.helperText,
          })
        }
      </Field>
    );
  else return React.cloneElement(primitiveFormGroup, { ...props });
}

export { FormGroup };
