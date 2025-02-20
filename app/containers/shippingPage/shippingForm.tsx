import React from 'react';
import styled from 'styled-components';
import { Card } from 'components/card';
import { Form } from 'components/form';
import { FormRenderProps } from 'react-final-form';
import FinalFormSpy from '../../finalFormSpy';
import { InputGroup } from 'components/inputGroup';
import { FormGroup } from 'components/formGroup';
import { Elevation, Button, Intent } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { VerticalWrapper } from 'components/verticalWrapper';
import { NumericInput } from 'components/numiricInput';
import { ApolloClient } from 'apollo-boost';
import { IShipping } from './type';
import { SHIPPING_EXISTS } from './queries';
import isEmpty from 'lodash/isEmpty';

export interface IDispatchProps {}

export interface IShippingFormProps {
  name: string;
  header: string;
  submitButtonText: string;
  elevated?: boolean;
  showCloseButton?: boolean;
  apolloClient: ApolloClient<any>;
  resetOnSuccessfulSubmit?: boolean;

  /**
   * provide only when using as an Update Form
   */
  currentItem?: IShipping;

  onSubmit: (shipping: IShipping) => void;
  onCloseButtonClick?: () => void;
}

export interface IShippingFormState {}

const StyledWrapper = styled(VerticalWrapper)`
  align-items: center;
`;

const ElevatedCard = styled(Card)`
  z-index: ${(props: Partial<IShippingFormProps>) =>
    props.elevated ? '99' : '10'};
`;

async function validateForm(values) {
  const errors: any = {};
  if (!values.wilaya || values.wilaya.trim() === '')
    errors.wilaya = 'Wilaya is required!';

  if (!values.price || values.price < 0) errors.price = 'Price is required!';

  return errors;
}

function ShippingForm(
  props: IShippingFormProps & IDispatchProps & IShippingFormState,
) {
  const {
    header,
    name,
    elevated,
    onCloseButtonClick,
    currentItem,
    submitButtonText,
    showCloseButton,
    resetOnSuccessfulSubmit,
  } = props;

  const shippingExists = async (
    submittedShipping: IShipping,
    errors: any = {},
  ) => {
    //Check if product name already exists (Unique Constraint)
    const shippingExistsResult = await props.apolloClient
      .query({
        query: SHIPPING_EXISTS,
        variables: { wilaya: submittedShipping.wilaya },
      })
      .catch(err => {
        errors.wilaya = 'Cannot check wilaya validity, please try again later';
        return errors;
      });

    if (shippingExistsResult) {
      if (shippingExistsResult.data.exists) {
        errors.wilaya = 'Wilaya already exists';
        return errors;
      }
    }
  };

  const onSubmit = async (values, currentItem?: IShipping) => {
    //TODO: Add image storing on nutsCDN
    const submittedShipping: IShipping = {
      id: currentItem && currentItem.id,
      wilaya: values.wilaya,
      price: values.price,
    };

    //Errors Object
    let errors: any = {};

    //NOTE: Only check if product exists when name doesnt match currentItem's name (possibly updating product)
    if (currentItem && submittedShipping.wilaya.trim() !== currentItem.wilaya) {
      errors = await shippingExists(submittedShipping, errors);
    }

    if (errors && !isEmpty(errors)) return errors;

    props.onSubmit(submittedShipping);
  };

  return (
    <ElevatedCard
      elevated={elevated}
      header={header}
      elevation={Elevation.FOUR}
      showCloseButton={showCloseButton}
      onCloseButtonClick={onCloseButtonClick}
    >
      <Form
        onSubmit={(values: any) =>
          onSubmit(
            values,
            currentItem && {
              id: currentItem.id,
              wilaya: (currentItem as any).name,
              price: currentItem.price,
            },
          )
        }
        validate={validateForm}
        resetOnSuccessfulSubmit={resetOnSuccessfulSubmit}
      >
        {(props: FormRenderProps) => {
          return (
            <VerticalWrapper>
              <FinalFormSpy form={name} />
              <FormGroup
                label="Wilaya"
                name="wilaya"
                helperText="Wilaya must be unique"
              >
                <InputGroup
                  name="wilaya"
                  placeholder="Wilaya Name"
                  initialValue={currentItem && (currentItem as any).name}
                />
              </FormGroup>
              <FormGroup
                label="Shipping Price"
                name="price"
                helperText="Price is in DZD"
              >
                <NumericInput
                  name="price"
                  placeholder="Price"
                  initialValue={currentItem && currentItem.price}
                />
              </FormGroup>
              <StyledWrapper>
                <FormGroup>
                  <Button
                    type="submit"
                    text={submitButtonText}
                    intent={Intent.SUCCESS}
                    disabled={
                      props.submitting || props.pristine || !props.dirty
                    }
                  />
                </FormGroup>
              </StyledWrapper>
            </VerticalWrapper>
          );
        }}
      </Form>
    </ElevatedCard>
  );
}

const mapStateToProps = () => {};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShippingForm);
