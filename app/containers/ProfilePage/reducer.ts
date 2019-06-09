import { IAction } from 'types';
import { IProfileState } from './type';

const initialState: IProfileState = {
  personalInfo: {
    username: '',
    email: '',
    fullName: '',
    phoneNumber: '',
    birthDate: new Date('1-1-1990'),
  },
  accountDetails: {
    password: '',
  },
};

function ProfileReducer(
  state: IProfileState = initialState,
  action: IAction,
): IProfileState {
  switch (action.type) {
    default:
      return state;
  }
}

export default ProfileReducer;
