import * as React from 'react';
import {
  InputGroup as BInputGroup,
  IInputGroupProps as BIInputGroupProps,
  Intent,
} from '@blueprintjs/core';
import { FieldProps, Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';

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
        {({ input, meta: { error, touched } }) =>
          React.cloneElement(primitiveInput, {
            ...input,
            ...props,
            intent: touched && error ? Intent.DANGER : props.intent,
          })
        }
      </Field>
    );
  else return primitiveInput;
}

//Default Props
InputGroup.defaultProps = {
  useNormalForm: true,
};

/**
 *  Keep track of Field changes and react upon those changes
 * `ex: reset input to default value`
 */
export interface IWhenFieldChangesProps {
  field: string;
  becomes: any;
  set: string;
  to: any;
}
const WhenFieldChanges = ({
  field,
  becomes,
  set,
  to,
}: IWhenFieldChangesProps) => (
  <Field name={set} subscription={{}}>
    {(
      // No subscription. We only use Field to get to the change function
      { input: { onChange } },
    ) => (
      <OnChange name={field}>
        {value => {
          if (value === becomes) {
            onChange(to);
          }
        }}
      </OnChange>
    )}
  </Field>
);

export { InputGroup, WhenFieldChanges };
