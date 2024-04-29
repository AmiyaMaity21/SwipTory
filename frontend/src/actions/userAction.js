// import axios from "axios";
import axiosInstance from "./axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
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
  loadUserRequest,
  loadUserFailure,
} from "../slice/userSlice";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
console.log(backendUrl);

// Register User
export const register = (userData) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const { data } = await axiosInstance.post(`${backendUrl}/user/register`,userData);
    dispatch(registerSuccess(data));
    toast.success("Registration Successful", {
      position: "bottom-right",
      autoClose: 2000,
    });
  } catch (error) {
    dispatch(registerFailure(error.response.data));
    toast.error(error.response.data.errorMessage, {
      position: "bottom-left",
      autoClose: 2000,
    });
  }
};

// Login User
export const login = (userData) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axiosInstance.post(
      `${backendUrl}/user/login`,
      userData
    );
    dispatch(loginSuccess(data));
    toast.success("Login Successful", {
      position: "bottom-right",
      autoClose: 2000,
    });
  } catch (error) {
    dispatch(loginFailure(error.response.data));
    toast.error(error.response.data.errorMessage, {
      position: "bottom-left",
      autoClose: 2000,
    });
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());
    await axiosInstance.get(`${backendUrl}/user/logout`);
    dispatch(logoutSuccess());
    toast.success("Logout Successful", {
      position: "bottom-right",
      autoClose: 1000,
    });
  } catch (error) {
    dispatch(logoutFailure());
    toast.error(error.response.data);
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    const { data } = await axiosInstance.get(`${backendUrl}/user/me`);
    dispatch(loadUserSuccess(data));
  } catch (error) {
    dispatch(loadUserFailure());
  }
};
