import * as React from 'react';
import {
  NumericInput as BNumericInput,
  INumericInputProps as BINumericInputProps,
  Intent,
} from '@blueprintjs/core';
import { FieldProps, Field } from 'react-final-form';

export interface IINumricInputProps {
  useNormalForm?: boolean;
  initialValue?: FieldProps<HTMLInputElement>['initialValue'];
}

type PropsType = IINumricInputProps &
  BINumericInputProps &
  FieldProps<HTMLInputElement>;

function NumericInput(props: PropsType) {
  const primitiveInput = <BNumericInput />;

  const onChangeWrapper = (inputOnChange: (e: any) => void) => {
    return function(valueAsNumber: number) {
      const customEvent = { target: { value: valueAsNumber } };
      inputOnChange(customEvent);
    };
  };

  if (props.useNormalForm)
    return (
      <Field name={props.name} initialValue={props.initialValue}>
        {({ input, meta: { error, touched } }) =>
          React.cloneElement(primitiveInput, {
            ...input,
            ...props,
            intent: touched && error ? Intent.DANGER : props.intent,
            onValueChange: onChangeWrapper(input.onChange),
          })
        }
      </Field>
    );
  else return primitiveInput;
}

//Default Props
NumericInput.defaultProps = {
  useNormalForm: true,
};

export { NumericInput };
