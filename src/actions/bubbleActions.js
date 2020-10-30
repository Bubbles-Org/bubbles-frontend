import Api from '../services/api';
import { createNotification } from 'actions/notificationActions';

export const BUBBLE_ASYNC_REQUEST_STARTED = 'BUBBLE_ASYNC_REQUEST_STARTED';
export const CREATE_BUBBLE_SUCCESS = 'CREATE_BUBBLE_SUCCESS';
export const CREATE_BUBBLE_FAILED = 'CREATE_BUBBLE_FAILED';
export const GET_BUBBLES_SUCCESS = 'GET_BUBBLES_SUCCESS';
export const GET_BUBBLES_FAILED = 'GET_BUBBLES_FAILED';

export const bubbleAsyncRequestStarted = () => ({
  type: BUBBLE_ASYNC_REQUEST_STARTED
});

const createBubbleSuccess = () => ({
  type: CREATE_BUBBLE_SUCCESS,
});

const createBubbleFailed = () => ({
  type: CREATE_BUBBLE_FAILED,
});

export const createBubbleRequest = (body) => {
  return dispatch => {
    dispatch(bubbleAsyncRequestStarted());
    Api.post('/bubble', body)
      .then(() => {
        dispatch(createBubbleSuccess());
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