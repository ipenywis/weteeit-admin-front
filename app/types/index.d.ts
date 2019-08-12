import { Reducer, Store } from 'redux';
import { RouterState } from 'connected-react-router';
import { ILanguageProviderProps } from 'containers/LanguageProvider';
import { INavigationState, INavBarState, IAppState } from 'containers/App/type';
import { ITeamPageState } from 'containers/TeamPage/type';

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
  saga: () => IterableIterator<any>;
  mode?: string | undefined;
}

// Your root reducer type, which is your redux state types also
export interface ApplicationRootState {
  readonly app: IAppState;
  readonly router: RouterState;
  readonly language: ILanguageProviderProps;
  readonly navigation: INavigationState;
  readonly navBar: INavBarState;
  readonly teamPage: ITeamPageState;
}

export interface IAction {
  type: string;
  payload: any;
}

export interface IAppError {
  state: 'normal' | 'critical';
  message: string;
}
