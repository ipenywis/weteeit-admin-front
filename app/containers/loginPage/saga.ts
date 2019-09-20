import ApolloClient from 'apollo-boost';
import { GetAuthAdmin } from './queries';
import { IAuthAdmin } from './type';
import * as cookies from 'js-cookie';
import { AUTH_COOKIE_KEY } from 'common';

export function loadAuthAdmin(client: ApolloClient<any>): Promise<IAuthAdmin> {
  return new Promise(async (rs, rj) => {
    const headers = { [AUTH_COOKIE_KEY]: cookies.get(AUTH_COOKIE_KEY) };
    const res = await client
      .query({ query: GetAuthAdmin, context: { headers } })
      .catch(err => {
        rj(err);
      });
    if (!res) return rj();

    if (res.data) {
      rs(res.data.authAdmin);
    } else {
      rj();
    }
  });
}

export default function* rootSaga() {}
