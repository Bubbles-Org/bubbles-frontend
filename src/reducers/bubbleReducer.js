import {
    BUBBLE_ASYNC_REQUEST_STARTED,
    CREATE_BUBBLE_FAILED,
    CREATE_BUBBLE_SUCCESS,
    GET_BUBBLES_FAILED,
    GET_BUBBLES_SUCCESS,
  } from 'actions/bubbleActions';
  
  const initialState = {
    bubble: {},
    bubbles: [],
    loading: false,
  };
  
const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case BUBBLE_ASYNC_REQUEST_STARTED:
            return {
                ...state,
                loading: true,
            };
        case GET_BUBBLES_SUCCESS:
            return {
                ...state,
                loading: false,
                bubbles: action.payload
            };
        case GET_BUBBLES_FAILED:
        case CREATE_BUBBLE_SUCCESS:
        case CREATE_BUBBLE_FAILED:
            return {
                ...initialState
            };
        default:
            return state;
    }
};

export default notificationReducer;