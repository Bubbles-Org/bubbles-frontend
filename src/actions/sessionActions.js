import Api from '../services/api';
import jwtDecode from 'jwt-decode';
import { createNotification } from 'actions/notificationActions';

export const LOGIN_ASYNC_REQUEST_STARTED = 'LOGIN_ASYNC_REQUEST_STARTED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const loginAsyncRequestStarted = () => ({
  type: LOGIN_ASYNC_REQUEST_STARTED
});

const loginSuccess = ({ data }) => ({
  type: LOGIN_SUCCESS,
  payload: {
    token: data.token,
    decode: { ...jwtDecode(data.token) }
  }
});

const loginFailed = data => ({
  type: LOGIN_FAILED,
  data
});

export const loginRequest = body => {
  return dispatch => {
    dispatch(loginAsyncRequestStarted());
    Api.post('/auth/login', body)
      .then(res => {
        if (res.data.token)
          dispatch(loginSuccess(res));
        else
          dispatch(createNotification({
            variant: 'error',
            message: 'Email ou senha incorretos'
          }))
      })
      .catch(error => {
        dispatch(loginFailed(error));
      });
  };
};

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutRequest = () => {
  return dispatch => {
    dispatch(loginAsyncRequestStarted());
    dispatch(logoutSuccess());
  };
};