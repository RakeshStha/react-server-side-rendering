import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./combineReducers/State";
import { updateReduxStore } from "./combineReducers/Storage";

const middleware = applyMiddleware(thunk);

const store = createStore(
    reducers,
    middleware
)

store.subscribe(() => {
    updateReduxStore(store)
})

export default store;
