import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    user: null,
    isAuthenticated: false,
    loading: false
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {

        loginSuccess: (state, action) => {

            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            window.localStorage.setItem("token", action.payload.token);
            window.localStorage.setItem("user",JSON.stringify(action.payload.user));

            console.log(state.token);
            console.log(state.user);

        },

        logout: (state) => {

            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("user");

        },

        setLoading: (state, action) => {

            state.loading = action.payload;

        },
        setUserFromLocalStorage: (state)=>{
            const token = window.localStorage.getItem('token');
            const user = window.localStorage.getItem('user');
            
            if(user && token){
                state.user = JSON.parse(user);
                state.token = token
                state.isAuthenticated = true
            }else{
                state.user = null;
                state.token = null;
            }
        },
        restoreSession: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        }
    }
});

export const {
    loginSuccess,
    logout,
    setLoading,
    setUserFromLocalStorage,
    restoreSession
} = authSlice.actions;

export default authSlice.reducer;