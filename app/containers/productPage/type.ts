export interface IProductPageState {
  isLoading: boolean;
  activeProductType: ProductTypes;
  products: IProduct[];
}

export enum ProductTypes {
  TSHIRT = 'TSHIRT',
  HOODIE = 'HOODIE',
  SWEETSHIRT = 'SWEETSHIRT',
  POSTER = 'POSTER',
  MUG = 'MUG',
  PILLOWS = 'PILLOWS',
}

export const ProductTypesValues = {
  tshirt: 'tshirt',
  hoodie: 'hoodie',
  sweetshirt: 'sweetshirt',
  poster: 'poster',
  mug: 'mug',
  pillows: 'pillows',
};

export interface IProduct {
  id?: number;
  name: string;
  type: ProductTypes;
  available: boolean;
  price: number;
  imageUrl: string;
}
