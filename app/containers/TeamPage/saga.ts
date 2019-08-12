import { put, takeLatest, all } from 'redux-saga/effects';
import { ActionTypes } from './constants';
import { teamsLoadComplete, addTeamState, removeTeamState } from './actions';
import { ITeam } from './type';
import { IAction } from 'types';
//import { showError } from 'containers/App/actions';

const delay = ms => new Promise(res => setTimeout(res, ms));

export function* getTeams() {
  yield delay(5000);
  //TODO: Add API fetch request
  const testTeams: ITeam[] = [
    {
      id: 0,
      name: 'ESS Setif',
      slogan: 'Entent Sportif Setifienne',
      logo:
        'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/ES_S%C3%A9tif_%28logo%29_2.png/220px-ES_S%C3%A9tif_%28logo%29_2.png',
    },
    {
      id: 1,
      name: 'USM Alger',
      slogan: "Union sportive de la médina d'Alger",
      logo:
        'https://www.dzbreaking.com/wp-content/uploads/2017/09/logo-usma-01.png',
    },
    {
      id: 2,
      name: 'JS Kabylie',
      slogan: 'Jeunesse Sportive de Kabylie',
      logo:
        'https://upload.wikimedia.org/wikipedia/de/thumb/e/e4/Jeunesse_Sportive_Kabylie_Logo.svg/150px-Jeunesse_Sportive_Kabylie_Logo.svg.png',
    },
    {
      id: 3,
      name: 'NA Hussein Dey',
      slogan: 'Nasr Athlétique de Hussein Dey',
      logo:
        'https://upload.wikimedia.org/wikipedia/en/thumb/1/15/NA_Hussein-Dey_%28logo%29.png/220px-NA_Hussein-Dey_%28logo%29.png',
    },
  ];
  /*yield put(
    showError({
      state: 'critical',
      message: 'Error Cannot Load Teams, Please Try Again Later!',
    }),
  );*/
  yield put(teamsLoadComplete(testTeams));
}

export function* addTeam(team: ITeam) {
  //TODO: Add API Add Request Here
  yield put(addTeamState(team));
}

export function* removeTeam(id: ITeam['id']) {
  yield put(removeTeamState(id));
}

export default function* rootSaga() {
  yield all([
    takeLatest(ActionTypes.LOAD_TEAMS, getTeams),
    takeLatest(ActionTypes.ADD_TEAM, (action: IAction) =>
      addTeam(action.payload),
    ),
    takeLatest(ActionTypes.REMOVE_TEAM, (action: IAction) =>
      removeTeam(action.payload),
    ),
  ]);
}
