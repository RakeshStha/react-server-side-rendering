import { filmsConstants } from "../constants";

let initState = {
    film: {},
    films: [],
    error: {},
    processing: false
}

export const filmsReducers = (state = initState, action) => {
    switch (action.type) {
       
        case filmsConstants.SUCCESS:
            return { ...state, film: action.payload.data, processing: false, error: {} }
        case filmsConstants.ERROR:
            return { ...state, error: { data: action.payload }, processing: false, film: {} }
        case filmsConstants.PROCESSING:
            return { ...state, processing: true }

        case filmsConstants.FETCH_ALL_SUCCESS:
            return { ...state, films: action.payload.data, processing: false, error: {} }
        case filmsConstants.FETCH_ALL_ERROR:
            return { ...state, error: { data: action.payload }, processing: false, films: [] }
        case filmsConstants.FETCH_ALL_PROCESSING:
            return { ...state, processing: true }

        case filmsConstants.RESET_DATA:
            return { ...state, film: {}, processing: false, error: {} }
    

        default:
            return state
    }
}