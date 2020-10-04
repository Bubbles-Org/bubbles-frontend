import Api from '../services/api';
import { createNotification } from 'actions/notificationActions';

export const CUSTOMER_ASYNC_REQUEST_STARTED = 'CUSTOMER_ASYNC_REQUEST_STARTED';
export const CREATE_CUSTOMER_SUCCESS = 'CREATE_CUSTOMER_SUCCESS';
export const CREATE_CUSTOMER_FAILED = 'CREATE_CUSTOMER_FAILED';

export const customerAsyncRequestStarted = () => ({
  type: CUSTOMER_ASYNC_REQUEST_STARTED
});

const createCustomerSuccess = () => ({
  type: CREATE_CUSTOMER_SUCCESS,
});

const createCustomerFailed = () => ({
  type: CREATE_CUSTOMER_FAILED,
});

export const createUserRequest = (body, router) => {
  return dispatch => {
    dispatch(customerAsyncRequestStarted());
    Api.post('/user', body)
      .then(() => {
        dispatch(createCustomerSuccess());
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
        dispatch(createCustomerFailed(error));
      });
  };
};