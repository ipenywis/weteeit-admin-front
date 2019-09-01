import * as React from 'react';
import { FieldProps, Field } from 'react-final-form';
import {
  TimePicker as BTimePicker,
  ITimePickerProps as IBTimePickerProps,
} from '@blueprintjs/datetime';

export interface ITimePickerProps {
  useNormalForm?: boolean;
  initialValue?: FieldProps<HTMLInputElement>['initialValue'];
}

type PropsType = ITimePickerProps &
  IBTimePickerProps &
  FieldProps<HTMLInputElement>;

function TimePicker(props: PropsType) {
  const primitiveInput = <BTimePicker />;

  const onChangeWrapper = (inputOnChange: (e: any) => void) => {
    return function(selectedTime: Date) {
      //Make an Object Act like a standard event
      //NOTE: passing event-like object in order to set the current date of the Field
      selectedTime.setSeconds(0);
      const eventWithValue = {
        target: { value: selectedTime },
      };
      inputOnChange(eventWithValue);
    };
  };

  if (props.useNormalForm)
    return (
      <Field name={props.name}>
        {({ input }) => {
          const defaultDate = new Date();
          defaultDate.setSeconds(0);
          const value =
            (input.value !== '' && input.value) ||
            props.initialValue ||
            defaultDate;
          return React.cloneElement(primitiveInput, {
            value,
            ...props,
            onChange: onChangeWrapper(input.onChange),
          });
        }}
      </Field>
    );
  else return React.cloneElement(primitiveInput, { ...props });
}

//Default Props
TimePicker.defaultProps = {
  useNormalForm: true,
};

export { TimePicker };
