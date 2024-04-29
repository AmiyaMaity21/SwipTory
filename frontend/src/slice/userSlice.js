import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticated: false,
  username: null,
  token: null,
  userId: null,
  loginError: null,
  registerError: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUserRequest: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.userId = action.payload.user._id;
      state.user = action.payload.user;
    },
    loadUserFailure: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.username = null;
      state.token = null;
      state.userId = null;
      state.user = null;
    },

    registerRequest: (state) => {
      state.loading = true;
      state.registerError = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.userId = action.payload.user._id;
      state.user = action.payload.user;
      state.registerError = null;
    },
    registerFailure: (state,action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.username = null;
      state.token = null;
      state.userId = null;
      state.user = null;
      state.registerError = action.payload.errorMessage;
    },

    loginRequest: (state) => {
      state.loading = true;
      state.loginError = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.userId = action.payload.user._id;
      state.loginError = null;
    },
    loginFailure: (state,action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.username = null;
      state.token = null;
      state.userId = null;
      state.loginError  = action.payload.errorMessage;
    },

    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.username = null;
      state.token = null;
      state.userId = null;
      state.user = null;
    },
    logoutFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  loadUserSuccess,
  loadUserFailure,
  loadUserRequest,
} = userSlice.actions;

export default userSlice.reducer;
