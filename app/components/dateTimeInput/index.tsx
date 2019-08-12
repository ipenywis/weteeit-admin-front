import * as React from 'react';
import { IInputGroupProps as BIInputGroupProps } from '@blueprintjs/core';
import { FieldProps, Field } from 'react-final-form';
import { DateInput, IDateFormatProps } from '@blueprintjs/datetime';

export interface IDateTimeInput {
  useNormalForm?: boolean;
  initialValue?: FieldProps<HTMLInputElement>['initialValue'];
}

type PropsType = IDateTimeInput &
  BIInputGroupProps &
  FieldProps<HTMLInputElement>;

function DateTimeInput(props: PropsType) {
  const primitiveInput = <DateInput />;

  const onChangeWrapper = (inputOnChange: (e: any) => void) => {
    return function(selectedDate: Date) {
      //Make an Object Act like a standard event
      //NOTE: passing event-like object in order to set the current date of the Field
      const eventWithValue = { target: { value: selectedDate } };
      inputOnChange(eventWithValue);
    };
  };

  const jsDateFormatter: IDateFormatProps = {
    formatDate: date => (date ? date.toLocaleDateString() : ''),
    parseDate: str => new Date(str),
    placeholder: 'M/D/YYYY',
  };

  if (props.useNormalForm)
    return (
      <Field name={props.name} initialValue={props.initialValue}>
        {({ input }) =>
          React.cloneElement(primitiveInput, {
            ...input,
            ...props,
            ...jsDateFormatter,
            onChange: onChangeWrapper(input.onChange),
            invalidDateMessage: 'Please select a valid date',
          })
        }
      </Field>
    );
  else return primitiveInput;
}

//Default Props
DateTimeInput.defaultProps = {
  useNormalForm: true,
};

export { DateTimeInput };
