import { put, call, takeLatest } from 'redux-saga/effects';
import { isAdminAuthenticated } from 'utils/authentication';

//Container SAGAs
import {
  activateGlobalLoading,
  disableGlobalLoading,
  showError,
  authenticated,
  needToAuthenticate,
  initialized,
} from './actions';
import { ActionTypes } from './constants';
import { IAction } from 'types';
import { IAppProps } from '.';
import ApolloClient from 'apollo-boost';
import { loadAuthAdmin } from 'containers/loginPage/saga';
import messages from './messages';
import { IAuthAdmin } from 'containers/loginPage/type';
import { setAuthAdmin } from './actions';

const wait = (num = 3000) => new Promise(rs => setTimeout(rs, num));

function* bootstrap(apolloClient: ApolloClient<any>, action: IAction) {
  //NOTE: Only Bootstrap when admin is authenticated
  const isAuthenticated = action.payload;
  if (isAuthenticated) {
    try {
      yield put(activateGlobalLoading());
      //Load Authenticated Admin metadata
      const authAdmin: IAuthAdmin = yield call(loadAuthAdmin, apolloClient);
      console.log('Auth Admin: ', authAdmin);
      yield wait();
      yield put(initialized());
      yield put(disableGlobalLoading());
      yield put(setAuthAdmin(authAdmin));
      //yield put(showError({ message: messages.INIT_ERROR, state: 'normal' }));
    } catch (err) {
      yield put(disableGlobalLoading());
      yield put(showError({ message: messages.INIT_ERROR, state: 'critical' }));
    }
  }
}

function* checkIsAuthenticated(verifyUrl: string) {
  //Check if Admin is Authenticated
  try {
    const isAuth = yield call(isAdminAuthenticated, verifyUrl);
    if (!isAuth) yield put(needToAuthenticate());
    else yield put(authenticated());
  } catch (err) {
    yield put(showError({ message: messages.INIT_ERROR, state: 'critical' }));
  }
}

export default function* rootSaga(props: IAppProps | any) {
  //Admin Auth Verify Endpoint-URL
  const verifyUrl = props && props.apiUrl + '/admin/verify';
  //ApolloClient
  const apolloClient = props && (props.apolloClient as ApolloClient<any>);

  yield call(checkIsAuthenticated, verifyUrl);
  yield (takeLatest as any)(ActionTypes.INIT, bootstrap, apolloClient);

  //yield all([checkIsAuthenticated(verifyUrl), bootstrap(isAuthenticated)]);
}
