import { IProduct } from 'containers/productPage/type';

export interface IOrderPageState {
  isOrdersLoading: boolean;
  orders: IOrder[];
}

export interface IOrder {
  id?: number;
  transactionId?: string;
  email: string;
  phone: string;
  facebook_profile: string;
  firstName: string;
  lastName: string;
  wilaya: string;
  city: string;
  instructions: string;
  shipped?: boolean;
}

export interface IProductWithQuantity {
  product: IProduct;
  quantity: number;
}
