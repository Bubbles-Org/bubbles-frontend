import { get } from 'lodash';

export const getToken = () => {
  const loginState = JSON.parse(localStorage.getItem('state'));
  return get(loginState, 'login.sessionToken', '');
};

export default getToken;
