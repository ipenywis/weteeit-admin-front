export interface IShippingPageState {
  isShippingsLoading: boolean;
  shippings: IShipping[];
}

export interface IShipping {
  id?: number;
  wilaya: string;
  price: number;
}
