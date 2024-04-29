import React from "react";
import "./StoryCard.css";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const StoryCard = ({ story, onEditClick }) => {
  const navigate = useNavigate();
  const { isAuthenticated, userId } = useSelector((state) => state.user);

  const handleOpen = () => {
    navigate(`/story/${story._id}`);
  };

  return (
    <>
      <div className="storyCard">
        <div
          onClick={handleOpen}
          className="story"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 1),rgba(0, 0, 0, 0)), url(${story.slides[0]?.imageUrl})`,
          }}
        >
          <div className="storyContent">
            <h3 className="storyHeading">
              {story.slides[0].heading &&
                story.slides[0].heading.substring(0, 25)}
              {story.slides[0].heading.length > 25 && "..."}
            </h3>
            <p className="storyDescription">
              {story.slides[0].description.substring(0, 100)}
              {story.slides[0].description.length > 100 && "..."}
            </p>
          </div>
        </div>

        {isAuthenticated && userId && story.createdBy === userId && (
          <div
            className="editStory"
            style={{ cursor: "pointer" }}
            onClick={() => onEditClick(story)}
          >
            <FaEdit />
            <div>Edit</div>
          </div>
        )}
      </div>
    </>
  );
};

export default StoryCard;
