import {combineReducers} from "redux";
import { filmsReducers } from "../reducers";

const reducers = combineReducers({
    films: filmsReducers
})

const rootReducer = (state, action) => {
    return reducers(state, action)
}

export default rootReducer