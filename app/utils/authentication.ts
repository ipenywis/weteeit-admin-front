import * as cookies from 'js-cookie';
import axios from 'axios';
import { AUTH_COOKIE_KEY } from 'common';

/**
 * Checks current session if there is a JWT token
 * for `weteeit-auth` cookie
 * Checks with URL `if-provided` to verify **JWT**
 * @Returns `boolean`
 */
export async function isAdminAuthenticated(url?: string): Promise<boolean> {
  const authToken = cookies.get(AUTH_COOKIE_KEY);
  if (!authToken) return false;
  if (url && url !== '') {
    const response = await axios
      .get<{ valid: boolean }>(url + '/' + authToken)
      .catch(err => {
        throw new Error('Cannot Authenticate Admin, Please try again');
      });
    if (response) return response.data.valid;
  }
  return false;
}
