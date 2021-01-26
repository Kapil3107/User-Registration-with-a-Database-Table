import axios from 'axios';
import { GET_INFOS, ADD_INFO, INFOS_LOADING, CLEAR_MSG } from './types';
import { returnErrors } from './errorActions';

export const getInfos = () => dispatch => {
    dispatch(setInfosLoading());
    axios.get('/api/infos')
        .then(res =>
            dispatch({
                type: GET_INFOS,
                payload: res.data
            })
        )
};

export const addInfo = (info) => dispatch => {
    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    const body = JSON.stringify(info);

    axios.post('/api/infos', body, config)
        .then(res => {
            dispatch({
                type: ADD_INFO,
                payload: res.data
            });
            dispatch(clearMessage());
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const setInfosLoading = () => {
    return {
        type: INFOS_LOADING
    }
}

export const clearMessage = () => {
    return {
        type: CLEAR_MSG
    }
}