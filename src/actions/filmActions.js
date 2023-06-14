import { filmsConstants } from '../constants'
import { api, processing, failure, success } from './axios';

const { API } = filmsConstants;

export const getFilms = () => {
    let url = API
    return dispatch => {
           dispatch(processing(filmsConstants.FETCH_ALL_PROCESSING, true))
        return api.get(url)
            .then(
                response => {
                    dispatch(success(filmsConstants.FETCH_ALL_SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(filmsConstants.FETCH_ALL_ERROR, error))
                    return error
                }
            )
    }
}

export const getFilm = (id) => {
    let url = `${API}/${id}`
    return dispatch => {
        dispatch(processing(filmsConstants.PROCESSING, true))
        return api.get(url)
            .then(
                response => {
                    dispatch(success(filmsConstants.SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(filmsConstants.ERROR, error))
                    return error
                }
            )
    }
}

export const deleteFilm = (id) => {
    let url = `${API}/${id}`
    return dispatch => {
        dispatch(processing(filmsConstants.DELETE_PROCESSING, true))
        return api.delete(url)
            .then(
                response => {
                    dispatch(success(filmsConstants.DELETE_SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(filmsConstants.DELETE_ERROR, error))
                    return error
                }
            )
    }
}

export const createFilm = (payload) => {
    let url = `${API}`
    return dispatch => {
        dispatch(processing(filmsConstants.CREATE_PROCESSING, true))
        return api.post(url, payload)
            .then(
                response => {
                    dispatch(success(filmsConstants.CREATE_SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(filmsConstants.CREATE_ERROR, error))
                    return error.response
                }
            )
    }
}


export const updateFilm = (id, payload) => {
    let url = `${API}/${id}`
    return dispatch => {
        dispatch(processing(filmsConstants.UPDATE_PROCESSING, true))
        return api.post(url, payload)
            .then(
                response => {
                    dispatch(success(filmsConstants.UPDATE_SUCCESS, response))
                    return response
                },
                error => {
                    dispatch(failure(filmsConstants.UPDATE_ERROR, error))
                    return error.response
                }
            )
    }
}