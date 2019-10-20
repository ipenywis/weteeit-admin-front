import { Reducer, Store } from 'redux';
import { RouterState } from 'connected-react-router';
import { ILanguageProviderProps } from 'containers/LanguageProvider';
import { INavigationState, INavBarState, IAppState } from 'containers/App/type';
import { ILoginState } from 'containers/loginPage/type';
import { FormState } from 'final-form';
import { IProductPageState } from 'containers/productPage/type';
import { IOrderPageState } from 'containers/orderPage/type';

export interface LifeStore extends Store {
  injectedReducers: any;
  injectedSagas: any;
  runSaga(
    saga: (() => IterableIterator<any>) | undefined,
    args: any | undefined,
  ): any;
}

export interface InjectReducerParams {
  key: keyof ApplicationRootState;
  reducer: Reducer<any, any>;
}

export interface InjectSagaParams {
  key: keyof ApplicationRootState;
  saga: (...args: any) => IterableIterator<any>;
  mode?: string | undefined;
}

export interface IFinalForms {
  [key: string]: FormState;
}

// Your root reducer type, which is your redux state types also
export interface ApplicationRootState {
  readonly app: IAppState;
  readonly router: RouterState;
  readonly language: ILanguageProviderProps;
  readonly navigation: INavigationState;
  readonly navBar: INavBarState;
  readonly login: ILoginState;
  readonly finalForm: IFinalForms;
  readonly productPage: IProductPageState;
  readonly orderPage: IOrderPageState;
}

export interface IAction {
  type: string;
  payload: any;
}

export interface IAppError {
  state: 'normal' | 'critical';
  message: string;
}

export interface IPageProps {
  disabled?: boolean;
}

export type WithOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;
