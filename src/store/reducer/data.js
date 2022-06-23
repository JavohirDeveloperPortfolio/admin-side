import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../action/api";
import {toast} from 'react-toastify';


const initialState = {sectionData: [], pages: 0, menuList: []}

const slice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        onGetMenuList: (state, {payload}) => {
            state.menuList = payload
        },
        onGetData: (state, {payload: {data}}) => {
            state.sectionData = data
        },
        onGetDataWithPage: (state, {payload: {data}}) => {
            state.sectionData = data
            state.pages = data.totalPages
        },
        onFailGettingData: (state, {payload}) => {
            state.sectionData = []
        },
        onFail: (state, {payload}) => {
            state.sectionData = []
        },

        onAddingData: (state, {payload: {data, message}}) => {
            toast.success(message, {autoClose: 1000})
            state.sectionData.unshift(data)
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
export const addCourse = (data) => apiCall({
    url: '/course/add',
    method: 'POST',
    onSuccess: slice.actions.onAddingData.type,
    onFail: slice.actions.onFail.type,
    headers: {Authorization: localStorage.getItem("access-token")},
    data
});


export default slice.reducer