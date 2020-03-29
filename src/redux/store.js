import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';

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

export const appStore = createStore(
    rootReducer,
    /* preloadedState, */
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

