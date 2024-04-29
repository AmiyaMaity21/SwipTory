import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LoginSignup from "./components/RegisterLogin/LoginSignup";
import AddStory from "./components/Story/StoryForm/StoryAdd";
import StoryDetails from "./components/Story/StoryDetails/StoryDetails";
import { useEffect, useState } from "react";
import { loadUser } from "./actions/userAction";
import { useDispatch } from "react-redux";
import Home from "./pages/HomePage";
import Bookmarks from "./pages/Bookmarks";
import UserStoriesPage from "./pages/UserStoriesPage";
function App() {
  const dispatch = useDispatch();

  const [isRegisterFormOpen, setRegisterFormOpen] = useState(false);
  const [isLoginFormOpen, setLoginFormOpen] = useState(false);
  const [isStoryFormOpen, setStoryFormOpen] = useState(false);
  const openRegisterFormModal = () => {
    setRegisterFormOpen(true);
    setLoginFormOpen(false);
  };
  const openLoginFormModal = () => {
    setLoginFormOpen(true);
    setRegisterFormOpen(false);
  };
  const openStoryFormModal = () => {
    setStoryFormOpen(true);
  };
  const formClose = () => {
    setRegisterFormOpen(false);
    setLoginFormOpen(false);
    setStoryFormOpen(false);
  };

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar
        showRegisterForm={openRegisterFormModal}
        showLoginForm={openLoginFormModal}
        showStoryForm={openStoryFormModal}
      />
      <LoginSignup
        isRegisterFormOpen={isRegisterFormOpen}
        isLoginFormOpen={isLoginFormOpen}
        onClose={formClose}
      />
      <AddStory isStoryFormOpen={isStoryFormOpen} onClose={formClose} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/story/:id" element={ <React.Fragment><Home /><StoryDetails /></React.Fragment>} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/my/stories" element={<UserStoriesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
