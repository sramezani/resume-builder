import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// export const appStore = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
// // export const appStore = createStore(
//     // rootReducer,
//     applyMiddleware(thunk)
// ))

// export const appStore = (initialState) => {
//     return createStore(
//         rootReducer,
//         initialState,
//         composeWithDevTools(applyMiddleware(thunk))
//     );
// };

const persistConfig = {
    key: 'primary',
    storage,
    whitelist: ['userData', 'workExperience', 'education', 'skills', 'theme', 'itemStatus'], // place to select which state you want to persist
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const appStore = createStore(
    persistedReducer,
    /* preloadedState, */
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

