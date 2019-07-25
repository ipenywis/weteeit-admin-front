import * as React from 'react';
import {
  InputGroup as BInputGroup,
  IInputGroupProps as BIInputGroupProps,
} from '@blueprintjs/core';
import { FieldProps, Field } from 'react-final-form';

export interface IInputGroupProps {
  useNormalForm?: boolean;
  initialValue?: FieldProps<HTMLInputElement>['initialValue'];
}

type PropsType = IInputGroupProps &
  BIInputGroupProps &
  FieldProps<HTMLInputElement>;

function InputGroup(props: PropsType) {
  const primitiveInput = <BInputGroup>{props.children}</BInputGroup>;

  if (props.useNormalForm)
    return (
      <Field name={props.name} initialValue={props.initialValue}>
        {({ input }) =>
          React.cloneElement(primitiveInput, { ...input, ...props })
        }
      </Field>
    );
  else return primitiveInput;
}

//Default Props
InputGroup.defaultProps = {
  useNormalForm: true,
};

export { InputGroup };
