import {
    BUBBLE_ASYNC_REQUEST_STARTED,
    CREATE_BUBBLE_FAILED,
    CREATE_BUBBLE_SUCCESS,
    GET_BUBBLES_FAILED,
    GET_BUBBLES_SUCCESS,
    GET_BUBBLE_DETAILS_FAILED,
    GET_BUBBLE_DETAILS_SUCCESS,
    UPDATE_BUBBLE_FAILED,
    UPDATE_BUBBLE_SUCCES
  } from 'actions/bubbleActions';
  
  const initialState = {
    bubble: {},
    bubbles: [],
    loading: false,
  };
  
const bubbleReducer = (state = initialState, action) => {
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
        case UPDATE_BUBBLE_SUCCES:
        case GET_BUBBLE_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                bubble: action.payload
            };
        case CREATE_BUBBLE_SUCCESS:
            return {
                ...state,
                loading: false,
                bubbles: state.bubbles.concat([action.payload])
            };
        case UPDATE_BUBBLE_FAILED:
        case GET_BUBBLE_DETAILS_FAILED:
        case GET_BUBBLES_FAILED:
        case CREATE_BUBBLE_FAILED:
            return {
                ...initialState
            };
        default:
            return state;
    }
};

export default bubbleReducer;