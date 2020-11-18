import Api from '../services/api';
import { createNotification } from 'actions/notificationActions';

export const BUBBLE_ASYNC_REQUEST_STARTED = 'BUBBLE_ASYNC_REQUEST_STARTED';
export const CREATE_BUBBLE_SUCCESS = 'CREATE_BUBBLE_SUCCESS';
export const CREATE_BUBBLE_FAILED = 'CREATE_BUBBLE_FAILED';
export const GET_BUBBLES_SUCCESS = 'GET_BUBBLES_SUCCESS';
export const GET_BUBBLES_FAILED = 'GET_BUBBLES_FAILED';
export const GET_BUBBLE_DETAILS_SUCCESS = 'GET_BUBBLE_DETAILS_SUCCESS';
export const GET_BUBBLE_DETAILS_FAILED = 'GET_BUBBLE_DETAILS_FAILED';
export const UPDATE_BUBBLE_SUCCES = 'UPDATE_BUBBLE_SUCCES';
export const UPDATE_BUBBLE_FAILED = 'UPDATE_BUBBLE_FAILED';

export const bubbleAsyncRequestStarted = () => ({
  type: BUBBLE_ASYNC_REQUEST_STARTED
});

const createBubbleSuccess = (payload) => ({
  type: CREATE_BUBBLE_SUCCESS,
  payload
});

const createBubbleFailed = () => ({
  type: CREATE_BUBBLE_FAILED,
});

export const createBubbleRequest = (body) => {
  return dispatch => {
    dispatch(bubbleAsyncRequestStarted());
    Api.post('/bubble', body)
      .then((response) => {
        dispatch(createBubbleSuccess(response.data));
        dispatch(createNotification({
          variant: 'success',
          message: 'Bolha criada com sucesso'
        }));
      })
      .catch(error => {
        dispatch(createNotification({
          variant: 'error',
          message: 'Ocorreu um erro ao criar bolha'
        }));
        dispatch(createBubbleFailed(error));
      });
  };
};

const getBubblesSuccess = (payload) => ({
    type: GET_BUBBLES_SUCCESS,
    payload
});
  
const getBubblesFailed = () => ({
    type: GET_BUBBLES_FAILED,
});
  
export const getBubblesRequest = () => {
    return dispatch => {
        dispatch(bubbleAsyncRequestStarted());
        Api.get('/bubble')
        .then((response) => {
            dispatch(getBubblesSuccess(response.data));
        })
        .catch(error => {
            dispatch(createNotification({
            variant: 'error',
            message: 'Ocorreu um erro ao listar bolhas'
            }));
            dispatch(getBubblesFailed(error));
        });
    };
};

const getBubbleDetailsSuccess = (payload) => ({
  type: GET_BUBBLE_DETAILS_SUCCESS,
  payload
});

const getBubbleDetailsFailed = () => ({
  type: GET_BUBBLE_DETAILS_FAILED,
});

export const getBubbleDetailsRequest = (id) => {
    return dispatch => {
      dispatch(bubbleAsyncRequestStarted());
      Api.get(`/bubble/${id}`)
      .then((response) => {
          dispatch(getBubbleDetailsSuccess(response.data));
      })
      .catch(error => {
          dispatch(createNotification({
          variant: 'error',
          message: 'Ocorreu um erro ao solicitar bolha'
          }));
          dispatch(getBubbleDetailsFailed(error));
      });
  };
};

const updateBubbleSucces = (payload) => ({
  type: UPDATE_BUBBLE_SUCCES,
  payload
});

const updateBubbleFailed = () => ({
  type: UPDATE_BUBBLE_FAILED,
});

export const updateBubbleRequest = (body, addUser) => {
    return dispatch => {
      dispatch(bubbleAsyncRequestStarted());
      const url = addUser ? '/bubble/add-user' : '/bubble'
      Api.put(url, body)
      .then((response) => {
          dispatch(updateBubbleSucces(response.data));
      })
      .catch(error => {
          dispatch(createNotification({
          variant: 'error',
          message: 'Ocorreu um erro ao atualizar bolha'
          }));
          dispatch(updateBubbleFailed(error));
      });
  };
};