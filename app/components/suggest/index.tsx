import React from 'react';
import {
  Suggest as BSuggest,
  ISuggestProps as IBSuggestProps,
} from '@blueprintjs/select';
import { FieldProps, Field } from 'react-final-form';

export interface ISuggestProps<T> {
  useNormalForm?: boolean;
  /**
   * Occurs when user selects an items from the suggested list
   * Must return string to store on current final-form state
   * @param item
   * @returns `string`
   */
  onItemSelect: (item: T) => any | null;
  isActiveItem: (id: any) => T | null;
}

type PropsType<T> = (ISuggestProps<T> | IBSuggestProps<T>) &
  FieldProps<HTMLInputElement>;

//TODO: Allow arrow-keys interaction to navigate between suggest select items
function Suggest<T>(props: PropsType<T>) {
  const primitiveInput = <BSuggest />;

  /**
   * Occurs when user selects and item from suggested list of items
   * @param inputOnChange
   */
  const onSelectWrapper = (inputOnChange: (e: any) => void) => {
    return function(item: T) {
      const value = props.onItemSelect(item);
      //Make DOM-like-Event to apply onChange for final-form field
      const eventWithValue = { target: { value } };
      inputOnChange(eventWithValue);
    };
  };

  if (props.useNormalForm)
    return (
      <Field name={props.name} initialValue={props.initialValue}>
        {({ input }) => {
          return React.cloneElement(primitiveInput, {
            ...props,
            activeItem: props.isActiveItem(input.value),
            onItemSelect: onSelectWrapper(input.onChange),
          });
        }}
      </Field>
    );
  else return React.cloneElement(primitiveInput, { ...props });
}

Suggest.defaultProps = {
  useNormalForm: true,
  fill: true,
  popoverProps: { minimal: true },
};

export { Suggest };
