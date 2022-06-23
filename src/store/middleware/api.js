import axios from "axios";
import {apiCall} from "../action/api";


const api = ({dispatch}) => (next) => (action) => {
    if (action.type !== apiCall.type) {
        next(action);
        return;
    }
    next(action)
    const {url, method, onSuccess, onFail, data} = action.payload


    axios({
        baseURL: 'http://192.168.197.66:9000/api/v1/',
        url,
        method,
        data,
    }).then(res => {
        dispatch({
            type: onSuccess,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: onFail,
            payload: err.response
        })
    })
}

export default api;