import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { /*createStateSyncMiddleware,*/ initMessageListener } from 'redux-state-sync';

// const predicate = action => {
//   const loginActionsRegex = '\\S*LOGIN\\S*';
//   const sessionActionsRegex = '\\S*SESSION';
//   const acceptedActionsRegex = new RegExp(`(${loginActionsRegex}|${sessionActionsRegex})`);
//   return action.type.match(acceptedActionsRegex);
// };

// const config = {
//   predicate,
// };

const middlewares = [thunk, /*createStateSyncMiddleware(config)*/];

export default function configureStore(preloadedState) {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancer(applyMiddleware(...middlewares))
  );

  initMessageListener(store);

  return store;
}
