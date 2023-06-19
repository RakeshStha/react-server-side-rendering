import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./combineReducers/State";
import { updateReduxStore } from "./combineReducers/Storage";

const middleware = applyMiddleware(thunk);

// Get the preloaded state from the global variable
const preloadedState = window.__PRELOADED_STATE__;


// Create the Redux store with the preloaded state
const store = createStore(
    rootReducer,
    preloadedState,
    middleware
)

store.subscribe(() => {
    updateReduxStore(store)
})

// Remove the preloaded state from the global scope
delete window.__PRELOADED_STATE__;

export default store;
