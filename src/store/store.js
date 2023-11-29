import {compose, applyMiddleware, createStore} from 'redux';
import { persistStore, persistReducer} from 'redux-persist'
import { loggerMiddleware } from './middleware/logger';
import { rootReducer } from './root-reducer';

import storage  from 'redux-persist/lib/storage'

import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';


const persitConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persitConfig, rootReducer);

const composeEnhancer = (
    process.env.NODE_ENV !== 'production' && 
    window && 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || 
    compose;

const middleWares = [
    process.env.NODE_ENV !== 'production' && loggerMiddleware,
    sagaMiddleware,
].filter(Boolean);

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
    persistedReducer, 
    undefined, 
    composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);



