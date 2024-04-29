import React, {Fragment, useState, useEffect} from "react";
import "./Bookmarks.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBookmarks } from "../../actions/storyAction";
import StoryCard from "../Story/StoryCard/StoryCard";
import StoryAdd from "../Story/StoryForm/StoryAdd";
import Loader from "../Loader/Loader";
const Bookmarks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [editStory, setEditStory] = useState(null); // State to hold the story to be edited
  const [isEditFormOpen, setIsEditFormOpen] = useState(false); // State to control the visibility of the edit form

  const { bookmarks, bookmarksLoading } = useSelector((state) => state.story);
  const { isAuthenticated } = useSelector((state) => state.user);

  const handleEditClick = (story) => {
    setEditStory(story); 
    setIsEditFormOpen(true); 
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      dispatch(getBookmarks());
    }
  }, [dispatch, navigate, isAuthenticated]);
  return (
    <Fragment>
      {bookmarksLoading ? (
        <Loader />
      ) : (
        <div className="bookmarkBody">
          <h1 className="bookmarkHeading">Your Bookmarks</h1>
          <div className="bookmarksContainer">
            {bookmarks?.length > 0 &&
              bookmarks.map((bookmark, index) => (
                <StoryCard story={bookmark} key={bookmark._id} onEditClick={handleEditClick}/>
              ))}

            {bookmarks?.length === 0 && (
              <div className="noBookamarksContainer">
                <h1 className="noBookmarkHeading">
                  No Bookmarks stories Available
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
        onClose={()=>setIsEditFormOpen(false)}
        editStory={editStory} 
      />
    </Fragment>
  );
};

export default Bookmarks;
