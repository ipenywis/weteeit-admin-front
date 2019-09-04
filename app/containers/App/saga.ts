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

const wait = (num = 3000) => new Promise(rs => setTimeout(rs, num));

function* bootstrap(action: IAction) {
  //NOTE: Only Bootstrap when admin is authenticated
  const isAuthenticated = action.payload;
  if (isAuthenticated) {
    yield put(activateGlobalLoading());
    yield wait();
    yield put(initialized());
    yield put(disableGlobalLoading());
  }
}

function* checkIsAuthenticated(verifyUrl: string) {
  //Check if Admin is Authenticated
  try {
    const isAuth = yield call(isAdminAuthenticated, verifyUrl);
    if (!isAuth) yield put(needToAuthenticate());
    else yield put(authenticated());
  } catch (err) {
    yield put(
      showError({ message: 'Initialization Error!', state: 'critical' }),
    );
  }
}

export default function* rootSaga(props: IAppProps) {
  const verifyUrl = props && props.apiUrl + '/admin/verify';

  yield call(checkIsAuthenticated, verifyUrl);
  yield takeLatest(ActionTypes.INIT, bootstrap);

  //yield all([checkIsAuthenticated(verifyUrl), bootstrap(isAuthenticated)]);
}
