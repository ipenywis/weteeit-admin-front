import React from 'react';
import {
  Checkbox as BCheckbox,
  ICheckboxProps as IBCheckBoxProps,
} from '@blueprintjs/core';
import { Field, FieldProps } from 'react-final-form';

export interface ICheckBoxProps {
  useNormalForm?: boolean;
}

type PropsType = (ICheckBoxProps | IBCheckBoxProps) &
  FieldProps<HTMLInputElement>;

function Checkbox(props: PropsType) {
  const primitiveCheckbox = <BCheckbox />;

  const onChangeWrapper = (inputOnChange: (e: any) => void) => {
    return function(e: React.ChangeEvent<HTMLInputElement>) {
      const customEvent = { target: { value: e.target.checked } };
      inputOnChange(customEvent);
    };
  };

  if (props.useNormalForm)
    return (
      <Field name={props.name} initialValue={props.initialValue}>
        {({ input }) =>
          React.cloneElement(primitiveCheckbox, {
            ...input,
            ...props,
            onChange: onChangeWrapper(input.onChange),
          })
        }
      </Field>
    );
  else return React.cloneElement(primitiveCheckbox, { ...props });
}

Checkbox.defaultProps = {
  useNormalForm: true,
};

export { Checkbox };
