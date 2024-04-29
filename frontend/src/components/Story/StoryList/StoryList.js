import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import StoryCard from "../StoryCard/StoryCard";
import { getStories, getStoriesByUser } from "../../../actions/storyAction";
import "./StoryList.css";
import Loader from "../../Loader/Loader";

const StoryList = ({ onEditClick }) => {
  const {
    stories,
    userStories,
    userStoriesPage,
    storiesLoading,
    page,
  } = useSelector((state) => state.story);
  const { isAuthenticated, userId } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const pagination = (category) => {
    dispatch(getStories(category, page + 1));
  };

  return (
    <Fragment>
      {storiesLoading ? (
        <Loader />
      ) : (
        <div className="storiesContainer">
          {isAuthenticated ? (
            <div>
              {userStories && userStories.length > 0 ? (
                <div>
                  <h2 className="storiesHeading">Your Stories</h2>
                  <div className="stories">
                    {userStories &&
                      userStories.map((story) => {
                        return (
                          <StoryCard
                            key={story._id}
                            story={story}
                            onEditClick={onEditClick}
                          />
                        );
                      })}
                  </div>
                  <div className="seeMore">
                    <button
                      className="seemoreBtn"
                      onClick={() =>
                        dispatch(getStoriesByUser(userId, userStoriesPage + 1))
                      }
                    >
                      See more
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="storiesHeading">Your Stories</h2>
                  <p className="noStory">No stories Available</p>
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
          {Object.entries(stories).map(([category, storiesArr]) => (
            <div key={category}>
              {storiesArr.length > 0 ? (
                <div>
                  <h2 className="storiesHeading">
                    Top Stories About {category}
                  </h2>
                  <div className="stories">
                    {storiesArr.map((story) => (
                      <StoryCard
                        key={story._id}
                        story={story}
                        onEditClick={onEditClick} // Pass handleEditClick function to StoryCard
                      />
                    ))}
                  </div>
                  <div className="seeMore">
                    <button
                      onClick={() => pagination(category)}
                      className="seemoreBtn"
                    >
                      See more
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="storiesHeading">
                    Top Stories About {category}
                  </h2>
                  <p className="noStory">No stories Available</p>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default StoryList;
