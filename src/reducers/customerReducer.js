import {
  CUSTOMER_ASYNC_REQUEST_STARTED,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_FAILED,
} from 'actions/customerActions';

const initialState = {
  customer: {},
  customers: [],
  loading: false,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CUSTOMER_ASYNC_REQUEST_STARTED:
      return {
        ...state,
        loading: true,
      };
    case CREATE_CUSTOMER_SUCCESS:
    case CREATE_CUSTOMER_FAILED:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default notificationReducer;