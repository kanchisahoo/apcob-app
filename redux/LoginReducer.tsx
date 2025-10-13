import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    phone: "",
    password: "",
    isUpdate: false,
    authToken: "",
    loginToken:"",
    fetchFeature:[],
    startProcessInstance:[],
    getFormSchema:{},
    completedTask:[]
};

const LoginReducer = createSlice({
    name: "login",
    initialState,
    reducers: {
        setLoginSuccess: (state, { payload }) => {
            state.isAuth = payload;
        },
        setIsUpdate: (state, { payload }) => {
            state.isUpdate = payload;
        },

        setPhoneNumber: (state, { payload }) => {
            state.phone = payload;
        },
        setPassword: (state, { payload }) => {
            state.password = payload;
        },
        setAuthToken: (state, { payload }) => {
            state.authToken = payload
        }, 
        setLoginToken: (state, { payload }) => {
            state.loginToken = payload
        },

        setFetchFeature:(state,{payload})=>{
            state.fetchFeature=payload
        },
        setStartProcessInstance:(state,{payload})=>{
            state.startProcessInstance=payload
        },
          setGetFormSchema:(state,{payload})=>{
            state.getFormSchema=payload
        },
        setCompleteTask:(state,{payload})=>{
            state.completedTask=payload
        }

    },
});

const { reducer, actions } = LoginReducer;
export const {
    setLoginSuccess,
    setPhoneNumber,
    setPassword,
    setAuthToken,
    setFetchFeature,
    setGetFormSchema,
    setStartProcessInstance,
    setCompleteTask,
    setLoginToken
} = actions;

export const userDetails = (state: any) => state.login.userDetails;
export const isAuth = (state: any) => state.login.isAuth;
export const loginToken = (state: any) => state.login.loginToken;
export const phone = (state: any) => state.login.phone;
export const password = (state: any) => state.login.password;
export const authToken = (state: any) => state.login.authToken;
export const fetchFeature = (state: any) => state.login.fetchFeature;
export const startProcessInstance = (state: any) => state.login.startProcessInstance;
export const getFormSchema = (state: any) => state.login.getFormSchema;
export const completedTask = (state: any) => state.login.completedTask;
export default reducer;
