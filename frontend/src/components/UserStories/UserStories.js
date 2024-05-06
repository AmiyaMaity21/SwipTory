import React, { Fragment, useEffect, useState } from "react";
import "./UserStories.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getStoriesByUser } from "../../actions/storyAction";
import { useSelector } from "react-redux";
import StoryCard from "../../components/Story/StoryCard/StoryCard";
import StoryAdd from "../../components/Story/StoryForm/StoryAdd";
import Loader from "../Loader/Loader";

const Stories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [editStory, setEditStory] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const { userStories, storiesLoading } = useSelector((state) => state.story);
  const { userId, isAuthenticated } = useSelector((state) => state.user);

  const handleEditClick = (story) => {
    setEditStory(story);
    setIsEditFormOpen(true);
  };
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      dispatch(getStoriesByUser(userId));
    }
  }, [userId, dispatch, navigate, isAuthenticated]);

  return (
    <Fragment>
      {storiesLoading ? (
        <Loader />
      ) : (
        <div className="userStoriesBody">
          <h1 className="yourStoriesHeading">Your Stories</h1>
          <div className="yourStoriesContainer">
            {userStories?.length > 0 &&
              userStories.map((story) => (
                <StoryCard
                  story={story}
                  key={story.id}
                  onEditClick={handleEditClick}
                />
              ))}

            {userStories?.length === 0 && (
              <div className="noStoriesContainer">
                <h1 className="noStoriesHeading">
                  You have not added any stories yet!
                </h1>
                <button className="backToHomeBtn" onClick={() => navigate("/")}>
                  Back to Home
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <StoryAdd
        isStoryFormOpen={isEditFormOpen}
        onClose={() => setIsEditFormOpen(false)}
        editStory={editStory}
      />
    </Fragment>
  );
};

export default Stories;
