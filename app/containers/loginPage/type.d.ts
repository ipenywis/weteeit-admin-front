export interface ILoginState {
  staySignedIn: boolean;
  error: string | null;
  authAdmin: IAuthAdmin | null;
}

export interface IAuthAdmin {
  username: string;
  email: string;
}
