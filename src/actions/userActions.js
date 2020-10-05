import Api from '../services/api';
import { createNotification } from 'actions/notificationActions';

export const USER_ASYNC_REQUEST_STARTED = 'USER_ASYNC_REQUEST_STARTED';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILED = 'CREATE_USER_FAILED';

export const userAsyncRequestStarted = () => ({
  type: USER_ASYNC_REQUEST_STARTED
});

const createUserSuccess = () => ({
  type: CREATE_USER_SUCCESS,
});

const createUserFailed = () => ({
  type: CREATE_USER_FAILED,
});

export const createUserRequest = (body, router) => {
  return dispatch => {
    dispatch(userAsyncRequestStarted());
    Api.post('/user', body)
      .then(() => {
        dispatch(createUserSuccess());
        dispatch(createNotification({
          variant: 'success',
          message: 'Usuário criado com sucesso'
        }));
        router.history.push('/auth/login');
      })
      .catch(error => {
        console.log(error)
        dispatch(createNotification({
          variant: 'error',
          message: 'Ocorreu um erro ao criar usuário'
        }));
        dispatch(createUserFailed(error));
      });
  };
};