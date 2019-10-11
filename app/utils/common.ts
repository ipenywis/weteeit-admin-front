import { ProductTypes } from 'containers/productPage/type';

/**
 * Promise Wait with a specified delay
 * use it with await
 * @param delay @default 3000
 */
export const wait = (delay: number = 3000) =>
  new Promise(rs => setTimeout(rs, delay));

export const isProductType = (type: string): ProductTypes => {
  switch (type) {
    case 'tshirt':
      return ProductTypes.TSHIRT;
    case 'hoodie':
      return ProductTypes.HOODIE;
    case 'sweetshirt':
      return ProductTypes.SWEETSHIRT;
    case 'poster':
      return ProductTypes.POSTER;
    case 'mug':
      return ProductTypes.MUG;
    case 'pillows':
      return ProductTypes.PILLOWS;
    default:
      return ProductTypes.TSHIRT;
  }
};
