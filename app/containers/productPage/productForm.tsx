import React, { useState } from 'react';
import styled from 'styled-components';
import { Card } from 'components/card';
import { Form } from 'components/form';
import { FormRenderProps } from 'react-final-form';
import FinalFormSpy from '../../finalFormSpy';
import { InputGroup } from 'components/inputGroup';
import { FormGroup } from 'components/formGroup';
import { Elevation, Button, Intent } from '@blueprintjs/core';
import { ListDropdown } from 'components/listDropdown';
import { ProductTypesValues, ProductTypes, IProduct } from './type';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setActiveType } from './actions';
import { isProductType } from 'utils/common';
import { VerticalWrapper } from 'components/verticalWrapper';
import { FileInput } from 'components/fileInput';
import { Thumbnail } from 'components/thumbnail';
import { Switch } from 'components/switch';
import { NumericInput } from 'components/numiricInput';
import { ApolloClient } from 'apollo-boost';
import { PRODUCT_EXISTS } from './queries';

export interface IDispatchProps {
  setActiveType: (type: ProductTypes) => void;
}

export interface IProductFormProps {
  name: string;
  header: string;
  submitButtonText: string;
  elevated?: boolean;
  showCloseButton?: boolean;
  apolloClient: ApolloClient<any>;

  /**
   * provide only when using as an Update Form
   */
  currentItem?: IProduct;

  onSubmit: (product: IProduct) => void;
  onCloseButtonClick?: () => void;
}

export interface IProductFormState {}

const StyledWrapper = styled(VerticalWrapper)`
  align-items: center;
`;

const ElevatedCard = styled(Card)`
  z-index: ${(props: Partial<IProductFormProps>) =>
    props.elevated ? '99' : '10'};
`;

async function validateForm(values) {
  const errors: any = {};
  if (!values.name || values.name.trim() === '')
    errors.name = 'Name is required!';

  if (!values.price || values.price < 0) errors.price = 'Price is required!';
  if (!values.image || values.image === '') errors.image = 'Image is required!';

  return errors;
}

function ProductForm(
  props: IProductFormProps & IDispatchProps & IProductFormState,
) {
  const {
    header,
    name,
    elevated,
    onCloseButtonClick,
    currentItem,
    submitButtonText,
    showCloseButton,
  } = props;

  const productTypes = Object.values(ProductTypesValues);

  //Local state
  const [productType, setProductType] = useState<string>(
    (currentItem && currentItem.type) || ProductTypes.TSHIRT.toLowerCase(),
  );

  const onProductTypeSelect = (type: string) => {
    const productType: ProductTypes = isProductType(type);
    setProductType(productType.toLowerCase());
  };

  const onSubmit = async values => {
    //TODO: Add image storing on nutsCDN
    const submittedProduct: IProduct = {
      id: currentItem && currentItem.id,
      type: isProductType(productType),
      name: values.name,
      price: values.price,
      imageUrl: '',
      available: values.available,
    };

    //Errors Object
    const errors: any = {};

    //Check if product name already exists (Unique Constraint)
    const productExistsResult = await props.apolloClient
      .query({
        query: PRODUCT_EXISTS,
        variables: { name: submittedProduct.name },
      })
      .catch(err => {
        errors.name = 'Cannot check name validity, please try again later';
      });

    if (productExistsResult) {
      if (productExistsResult.data.exists) {
        errors.name = 'Name already exists';
        return errors;
      }
    }

    props.onSubmit(submittedProduct);

    return errors;
  };

  const isProductAvailable = currentItem && currentItem.available;

  return (
    <ElevatedCard
      elevated={elevated}
      header={header}
      elevation={Elevation.FOUR}
      showCloseButton={showCloseButton}
      onCloseButtonClick={onCloseButtonClick}
    >
      <Form
        onSubmit={onSubmit}
        validate={validateForm}
        initialValues={{ available: isProductAvailable }}
      >
        {(props: FormRenderProps) => {
          return (
            <VerticalWrapper>
              <FinalFormSpy form={name} />
              <StyledWrapper>
                <Thumbnail
                  src={
                    props.values.image || (currentItem && currentItem.imageUrl)
                  }
                  size="L"
                  previewText="Product Image"
                />
              </StyledWrapper>
              <FormGroup label="Availability">
                <Switch
                  name="available"
                  label="Available?"
                  initialValue={currentItem && currentItem.available}
                  innerLabel="no"
                  innerLabelChecked="yes"
                />
              </FormGroup>
              <FormGroup
                label="Name"
                name="name"
                helperText="Name must be unique"
              >
                <InputGroup
                  name="name"
                  placeholder="Name"
                  initialValue={currentItem && currentItem.name}
                  disabled={!props.values.available}
                />
              </FormGroup>
              <FormGroup label="Type">
                <ListDropdown
                  dropdownItems={productTypes}
                  onDropdownItemSelect={onProductTypeSelect}
                  activeDropdownItem={
                    currentItem ? currentItem.type : productType
                  }
                  disabled={!props.values.available}
                />
              </FormGroup>
              <FormGroup
                label="Price"
                name="price"
                helperText="Price is in DZD"
              >
                <NumericInput
                  name="price"
                  placeholder="Price"
                  initialValue={currentItem && currentItem.price}
                  disabled={!props.values.available}
                />
              </FormGroup>
              <FormGroup
                label="Thumbnail"
                name="image"
                helperText="Product Image"
              >
                <FileInput
                  name="image"
                  text={currentItem && 'Choose a new Image'}
                  initialValue={currentItem && currentItem.imageUrl}
                  disabled={!props.values.available}
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

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  setActiveType: (type: ProductTypes) => dispatch(setActiveType(type)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductForm);
