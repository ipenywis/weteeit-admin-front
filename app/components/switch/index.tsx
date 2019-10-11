import React from 'react';
import {
  Switch as BSwitch,
  ISwitchProps as IBSwitchProps,
} from '@blueprintjs/core';
import { Field, FieldProps } from 'react-final-form';

export interface ISwitchProps {
  useNormalForm?: boolean;
}

type PropsType = (ISwitchProps | IBSwitchProps) & FieldProps<HTMLInputElement>;

function Switch(props: PropsType) {
  const primitiveSwitch = <BSwitch />;

  const onChangeWrapper = (inputOnChange: (e: any) => void) => {
    return function(e: React.ChangeEvent<HTMLInputElement>) {
      const customEvent = { target: { value: e.target.checked } };
      inputOnChange(customEvent);
    };
  };

  if (props.useNormalForm)
    return (
      <Field name={props.name} initialValue={true}>
        {({ input }) => {
          return React.cloneElement(primitiveSwitch, {
            ...input,
            ...props,
            checked: input.value,
            onChange: onChangeWrapper(input.onChange),
          });
        }}
      </Field>
    );
  else return React.cloneElement(primitiveSwitch, { ...props });
}

Switch.defaultProps = {
  useNormalForm: true,
};

export { Switch };
