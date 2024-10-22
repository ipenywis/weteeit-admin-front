import * as React from 'react';
import { FieldProps, Field } from 'react-final-form';
import {
  DateInput,
  IDateFormatProps,
  IDateInputProps,
} from '@blueprintjs/datetime';

export interface IDateTimeInput {
  useNormalForm?: boolean;
  initialValue?: FieldProps<HTMLInputElement>['initialValue'];
}

type PropsType = IDateTimeInput &
  Partial<IDateInputProps> &
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
    formatDate:
      props.formatDate || (date => (date ? date.toLocaleDateString() : '')),
    parseDate: props.parseDate || (str => new Date(str)),
    placeholder: props.placeholder || 'M/D/YYYY',
  };

  if (props.useNormalForm)
    return (
      <Field name={props.name}>
        {({ input }) => {
          const value = input.value || props.initialValue;
          return React.cloneElement(primitiveInput, {
            value,
            ...props,
            ...jsDateFormatter,
            onChange: onChangeWrapper(input.onChange),
            invalidDateMessage: 'Please select a valid date',
          });
        }}
      </Field>
    );
  else return React.cloneElement(primitiveInput, { ...props });
}

//Default Props
DateTimeInput.defaultProps = {
  useNormalForm: true,
};

export { DateTimeInput };
