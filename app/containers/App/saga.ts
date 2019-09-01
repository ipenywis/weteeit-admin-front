import { put } from 'redux-saga/effects';

//Container SAGAs
import { getTeams } from '../TeamPage/saga';
import { activateGlobalLoading, disableGlobalLoading } from './actions';

export function* bootstrap() {
  //TODO: Active Loading State here
  yield put(activateGlobalLoading());
  yield getTeams();
  yield put(disableGlobalLoading());
  //TODO: End loading state here
}

export default function* rootSaga() {
  ///yield all([bootstrap()]);
}
