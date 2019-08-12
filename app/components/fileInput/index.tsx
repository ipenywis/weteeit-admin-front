import React, { useState } from 'react';
import { FieldProps, Field } from 'react-final-form';
import {
  IFileInputProps as BIFileInputProps,
  FileInput as BFileInput,
} from '@blueprintjs/core';
import { readFileAsBase64 } from 'utils/fileReader';
import { AppToaster } from 'components/toaster';

export interface IFileInputProps {
  useNormalForm?: boolean;
  initialValue?: FieldProps<HTMLInputElement>['initialValue'];
  errorMessage?: string;
}

type IFileInputPropsType = IFileInputProps &
  FieldProps<HTMLInputElement> &
  BIFileInputProps;

function FileInput(props: IFileInputPropsType) {
  const primitiveInput = <BFileInput />;

  const defaultInputText = 'Choose a File...';
  const [inputText, setInputText] = useState(defaultInputText);

  const showFileError = () => {
    AppToaster.show({
      message: props.errorMessage || 'Error, Cannot Read File!',
    });
  };

  const onChangeWrapper = (inputOnChange: (e: any) => void) => {
    return async function(evt: React.FormEvent<HTMLInputElement>) {
      const file = (evt.currentTarget.files as FileList).item(0);
      const base64URL = await readFileAsBase64(file).catch(
        (err: DOMException) => {
          showFileError();
        },
      );
      if (!base64URL || (base64URL && base64URL.trim() === '')) showFileError();
      else {
        const eventWithValue = { target: { value: base64URL } };
        //Submit Change Event to Field Input
        inputOnChange(eventWithValue);
        if (file) setInputText(file.name);
      }
    };
  };

  if (props.useNormalForm)
    return (
      <Field name={props.name}>
        {({ input }) => {
          return React.cloneElement(primitiveInput, {
            ...props,
            text: inputText,
            hasSelection: inputText !== defaultInputText,
            onInputChange: onChangeWrapper(input.onChange),
          });
        }}
      </Field>
    );
  else return primitiveInput;
}

FileInput.defaultProps = {
  useNormalForm: true,
};

export { FileInput };
