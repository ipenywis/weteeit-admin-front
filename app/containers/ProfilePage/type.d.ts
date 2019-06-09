export interface IPersonalInfo {
  username: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  birthDate: Date;
}

export interface IAccountDetails {
  password: string;
}

export interface IProfileState {
  personalInfo: IPersonalInfo;
  accountDetails: IAccountDetails;
}
