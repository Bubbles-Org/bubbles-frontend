import {
  USER_ASYNC_REQUEST_STARTED,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILED,
} from 'actions/userActions';

const initialState = {
  user: {},
  users: [],
  loading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ASYNC_REQUEST_STARTED:
      return {
        ...state,
        loading: true,
      };
    case CREATE_USER_SUCCESS:
    case CREATE_USER_FAILED:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default userReducer;