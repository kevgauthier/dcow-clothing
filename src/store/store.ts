import {compose, applyMiddleware, createStore, Middleware} from 'redux';
import { persistStore, persistReducer, PersistConfig} from 'redux-persist'
import { loggerMiddleware } from './middleware/logger';
import { rootReducer } from './root-reducer';

import storage  from 'redux-persist/lib/storage'

import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';

export type RootState = ReturnType<typeof rootReducer>

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[];
}

const persitConfig: ExtendedPersistConfig = {
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
].filter((middleware): middleware is Middleware => Boolean(middleware));

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
    persistedReducer, 
    undefined, 
    composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);



