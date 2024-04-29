import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storyLoading: false,
  storiesLoading: false,
  bookmarksLoading: false,
  stories: [],
  userStories: null,
  bookmarks: [],
  story: null,
  bookmarked: false,
  newStory: false,
  newLike: false,
  editStory: false,
  liked: false,
  totalLikes: 0,
  page: 1,
  userStoriesPage: 1,
};

const storySlice = createSlice({
  initialState,
  name: "story",
  reducers: {
    createStoryRequest: (state) => {
      state.storiesLoading = true;
      state.newStory = false;
    },
    createStorySuccess: (state, action) => {
      state.storiesLoading = false;
      state.newStory = true;
    },
    createStoryFailure: (state) => {
      state.storiesLoading = false;
      state.newStory = false;
    },
    getStoriesRequest: (state) => {
      state.storiesLoading = true;
    },
    getStoriesSuccess: (state, action) => {
      state.storiesLoading = false;
      state.stories = action.payload.stories;
      state.page = action.payload.page;
    },
    getStoriesFailure: (state) => {
      state.storiesLoading = false;
    },
    getStoryByUserRequest: (state) => {
      state.storiesLoading = true;
    },
    getStoryByUserSuccess: (state, action) => {
      state.storiesLoading = false;
      state.userStories = action.payload.stories;
      state.userStoriesPage = action.payload.page;
    },
    getStoryByUserFailure: (state) => {
      state.storiesLoading = false;
    },
    getBookmarksRequest: (state) => {
      state.bookmarksLoading = true;
    },
    getBookmarksSuccess: (state, action) => {
      state.bookmarksLoading = false;
      state.bookmarks = action.payload;
    },
    getBookmarksFailure: (state) => {
      state.bookmarksLoading = false;
    },
    bookmarkRequest: (state) => {
      state.storyLoading = true;
    },
    bookmarkSuccess: (state, action) => {
      state.storyLoading = false;
      state.bookmarked = true;
    },
    bookmarkFailure: (state) => {
      state.storyLoading = false;
    }, 
    likeRequest: (state) => {
      state.storyLoading = true;
      state.newLike = false;
    },
    likeSuccess: (state, action) => {
      state.storyLoading = false;
      state.liked = true;
      state.newLike = true;
    },
    likeFailure: (state) => {
      state.storyLoading = false;
      state.newLike = false;
    },
    getStoryRequest: (state) => {
      state.storyLoading = true;
      state.newLike = false;
    },
    getStorySuccess: (state, action) => {
      state.storyLoading = false;
      state.story = action.payload.story;
      state.liked = action.payload.liked;
      state.totalLikes = action.payload.totalLikes;
      state.bookmarked = action.payload.bookmarked;
    },

    getStoryFailure: (state) => {
      state.storyLoading = false;
    },
    editStoryRequest: (state) => {
      state.storyLoading = true;
      state.editStory = false;
    },
    editStorySuccess: (state, action) => {
      state.storyLoading = false;
      state.story = action.payload;
      state.editStory = true;
    },
    editStoryFailure: (state) => {
      state.storyLoading = false;
      state.editStory = false;
    },
  },
});

export const {
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
} = storySlice.actions;

export default storySlice.reducer;
