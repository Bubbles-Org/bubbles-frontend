import { combineReducers } from 'redux';
import { withReduxStateSync } from 'redux-state-sync';
import sessionReducer from './sessionReducer';
import notificationReducer from './notificationReducer';
import bubbleReducer from './bubbleReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  notification: notificationReducer,
  bubble: bubbleReducer,
});

export default withReduxStateSync(rootReducer);
