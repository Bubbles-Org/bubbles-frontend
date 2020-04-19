import { LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGIN_ASYNC_REQUEST_STARTED } from 'actions/sessionActions';

const defaultAvatar = '/images/avatars/corona-mock.png';
const initialState = {
  loading: false,
  loggedIn: false,
  sessionToken: '',
  loggedUser: {
    avatar: defaultAvatar
  }
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ASYNC_REQUEST_STARTED:
      return {
        ...initialState,
        loading: true,
      }
    case LOGIN_SUCCESS: {
      if (!action.payload.token) {
        return {
          ...initialState,
        };
      }
      return {
        ...initialState,
        loggedIn: true,
        sessionToken: action.payload.token,
        loggedUser: { 
          ...action.payload.decode.user,
          avatar: defaultAvatar,
        }
      }
    }

    case LOGOUT_SUCCESS: {
      return {
        ...initialState
      };
    }

    default: {
      return state;
    }
  }
};

export default sessionReducer;
