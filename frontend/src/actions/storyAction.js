import axios from "axios";
// import axiosInstance from './axiosInstance';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createStoryRequest,
  createStorySuccess,
  createStoryFailure,
  getStoriesRequest,
  getStoriesSuccess,
  getStoriesFailure,
  getStoryByUserRequest,
  getStoryByUserSuccess,
  getStoryByUserFailure,
  getBookmarksRequest,
  getBookmarksSuccess,
  getBookmarksFailure,
  bookmarkRequest,
  bookmarkSuccess,
  bookmarkFailure,
  likeRequest,
  likeSuccess,
  likeFailure,
  getStoryRequest,
  getStorySuccess,
  getStoryFailure,
  editStoryRequest,
  editStorySuccess,
  editStoryFailure,
} from "../slice/storySlice";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

// Create a new story
export const createStory = (slides) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    dispatch(createStoryRequest());
    const { data } = await axios.post(`${backendUrl}/story/create`, { slides });
    dispatch(createStorySuccess(data));
    toast.success("Story created successfully", { position: "top-center", autoClose: 2000});
  } catch (error) {
    dispatch(createStoryFailure());
    toast.error(error.response.data.errorMessage, { position: "top-center" });
  }
};

// Get all story
export const getStories =
  (category, page, catLimit, cat) => async (dispatch) => {
    try {
      dispatch(getStoriesRequest());
      const { data } = await axios.get(
        `${backendUrl}/story/all-stories?category=${category}&page=${page}&catLimit=${catLimit}&cat=${cat}`
      );
      dispatch(getStoriesSuccess(data));
    } catch (error) {
      dispatch(getStoriesFailure());
      toast.error(error.response.data);
    }
  };

// Get User stories
export const getStoriesByUser =
  (userId, userStoriesPage) => async (dispatch) => {
    try {
      if (userStoriesPage === null) {
        userStoriesPage = 1;
      }
      dispatch(getStoryByUserRequest());
      const { data } = await axios.get(
        `${backendUrl}/story/all-stories?userId=${userId}&page=${userStoriesPage}`
      );
      dispatch(getStoryByUserSuccess(data));
    } catch (error) {
      dispatch(getStoryByUserFailure());
      toast.error(error.response.data);
    }
  };

// Get a story detail
export const getStory = (storyId, userId) => async (dispatch) => {
  try {
    dispatch(getStoryRequest());
    if (userId == null) {
      const { data } = await axios.get(`${backendUrl}/story/details/${storyId}`);
      dispatch(getStorySuccess(data));
    } else {
      const { data } = await axios.get(
        `${backendUrl}/story/details/${storyId}?userId=${userId}`
      );
      dispatch(getStorySuccess(data));
    }
  } catch (error) {
    dispatch(getStoryFailure());
    toast.error(error);
  }
};

// Edit Story
export const updateStory = (updatedStory) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    dispatch(editStoryRequest());
    const { data } = await axios.put(
      `${backendUrl}/story/edit/${updatedStory.storyId}`,
      updatedStory, { withCredentials: true }
    );
    dispatch(editStorySuccess(data));
    toast.success("Story updated successfully", { position: "top-center", autoClose: 2000 });
  } catch (error) {
    dispatch(editStoryFailure());
    toast.error(error.response.data.errorMessage, { position: "top-center" });
  }
};

// Get Bookmarks story
export const getBookmarks = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    dispatch(getBookmarksRequest());
    const { data } = await axios.get(`${backendUrl}/story/bookmarks`);
    dispatch(getBookmarksSuccess(data.bookmarks));
  } catch (error) {
    dispatch(getBookmarksFailure());
    toast.error(error.response.data);
  }
};

// Bookmark story
export const bookmarkStory = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    dispatch(bookmarkRequest());
    const { data } = await axios.post(`${backendUrl}/story/bookmark/${id}`);
    dispatch(bookmarkSuccess(data.story));
    toast.success("Story bookmarked successfully", { position: "top-center", autoClose: 2000 });
  } catch (error) {
    dispatch(bookmarkFailure());
    toast.error(error.response.data.errorMessage, { position: "top-center" });
  }
};

// Like Story
export const likeStory = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    dispatch(likeRequest());
    const data = await axios.put(`${backendUrl}/story/like/${id}`);
    dispatch(likeSuccess(data.story));
    toast.success("Story liked successfully", { position: "top-center", autoClose: 2000 });
  } catch (error) {
    dispatch(likeFailure());
    toast.error(error.response.data.errorMessage, { position: "top-center", autoClose: 2000 });
  }
};
