import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../action/api";
import {toast} from 'react-toastify';
import {useNavigate} from "react-router";


const initialState = {sectionData: [], pages: 0, menuList: [], isNotAuthorization: false, groupContent:{}}

const slice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        onGetMenuList: (state, {payload}) => {
            console.log("menu list", payload)
            state.menuList = payload
        },
        onGetData: (state, {payload: {data}}) => {
            console.log("section data", data)
            state.sectionData = data
        },
        onGetDataWithPage: (state, {payload: {data}}) => {
            console.log("data with page", data)
            state.sectionData = data
            state.pages = data.body.totalPages
        },
        onFailGettingData: (state, {payload}) => {
            state.sectionData = []
            toast.error("Can not get data", {autoClose: 1000})
        },
        onFail: (state, {payload}) => {
            if(payload.status === 401){
                localStorage.removeItem('access-token')
                state.isNotAuthorization = true
            }
            state.sectionData = []
        },

        onAddingData: (state, {payload: {data, message}}) => {
            toast.success(message, {autoClose: 1000})
            state.sectionData.unshift(data)
        },

        onGetGroupContent: (state, {payload: {data}}) => {
            console.log("group contetn", data)
            state.groupContent = data
        }

    }
})


export const getMenuList = () => apiCall({
    url: 'user/admin/section',
    method: 'GET',
    onSuccess: slice.actions.onGetMenuList.type,
    onFail: slice.actions.onFail.type,
    headers: {Authorization: localStorage.getItem("access-token")}
});

export const getDataWithPage = (id, page) => apiCall({
    url: '/user/admin/section/data?id=' + id + '&pageNumber=' + page,
    method: 'GET',
    onSuccess: slice.actions.onGetDataWithPage.type,
    onFail: slice.actions.onFailGettingData.type,
    headers: {Authorization: localStorage.getItem("access-token")}
});

export const getGroupContent = (id) => apiCall({
    url: `/group/get/${id}`,
    method: 'GET',
    onSuccess: slice.actions.onGetGroupContent.type,
    onFail: slice.actions.onFailGettingData.type,
    headers: {Authorization: localStorage.getItem("access-token")}
});

export const addCourse = (data) => apiCall({
    url: '/course/add',
    method: 'POST',
    onSuccess: slice.actions.onAddingData.type,
    onFail: slice.actions.onFail.type,
    headers: {Authorization: localStorage.getItem("access-token")},
    data
});


export default slice.reducer