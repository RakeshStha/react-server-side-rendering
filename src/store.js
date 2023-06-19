import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./combineReducers/State";
import { updateReduxStore } from "./combineReducers/Storage";

const middleware = applyMiddleware(thunk);

const store = createStore(
    rootReducer,
    middleware
)

store.subscribe(() => {
    updateReduxStore(store)
})

export default store;
