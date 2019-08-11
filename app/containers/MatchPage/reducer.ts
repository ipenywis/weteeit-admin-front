import { IMatchPageState } from './type';
import { IAction } from '../../types';

const initialState: IMatchPageState = {

}

export default function MatchPageReducer(
  state: IMatchPageState = initialState,
  action: IAction,
) {
  switch (action.type) {
    default:
      return state;
  }
}
