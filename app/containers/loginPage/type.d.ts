export interface ILoginState {
  username: string;
  password: string;
  staySignedIn: boolean;
  error: string | null;
}
