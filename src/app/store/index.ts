import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
​
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
​
​
export interface RootStore {
}
​
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [sagaMiddleware, logger];

export const rootStore = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware)),
);

sagaMiddleware.run(rootSaga);
