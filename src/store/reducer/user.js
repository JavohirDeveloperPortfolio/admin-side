import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../action/api";
import {toast} from 'react-toastify';


const initialState = {user: {}, authorization: false, crtUser: {}, userDetails: {}}

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        onAuthSuccess: (state, {payload: {accessToken, refreshToken}}) => {
            localStorage.setItem('access-token', accessToken)
            localStorage.setItem('refresh-token', refreshToken)
            toast.success('Success', {autoClose: 500})
            state.authorization = true
        },

        onGetMe: (state, {payload}) => {
            console.log("user getme", payload)
            state.crtUser.id = payload
            state.authorization = true
        },
        onFail: (state, {payload: {data: {message}}}) => {
            state.authorization = false
            localStorage.removeItem('access-token')
            localStorage.removeItem('refresh-token')
            toast.error(message, {autoClose: 1500})
        },
        onFailGetMe: (state, {payload}) => {
            state.authorization = false
            localStorage.removeItem('access-token')
            localStorage.removeItem('refresh-token')
        },
        onGetUserDetails: (state, {payload: {data}}) => {
            state.userDetails = data
        }
    }
})


export const login = (data) => apiCall({
    url: 'user/auth/login',
    method: 'POST',
    onSuccess: slice.actions.onAuthSuccess.type,
    onFail: slice.actions.onFail.type,
    data
});

export const getMe = () => apiCall({
    url: 'user/auth/getMe',
    method: 'GET',
    onSuccess: slice.actions.onGetMe.type,
    onFail: slice.actions.onFailGetMe.type,
    headers: {Authorization: localStorage.getItem("access-token")}
});

export const getUserDetails = (id) => apiCall({
    url: `/group/user_details/${id}`,
    method: 'GET',
    onSuccess: slice.actions.onGetUserDetails.type,
    onFail: slice.actions.onFail.type,
    headers: {Authorization: localStorage.getItem("access-token")}
})


export default slice.reducer