import React, { useEffect, useState } from "react";
import CategoriesSection from "../components/CategoriesSection/CategoriesSection";
import StoryList from "../components/Story/StoryList/StoryList";
import { useSelector, useDispatch } from "react-redux";
import { getStories, getStoriesByUser } from "../actions/storyAction";
import StoryAdd from "../components/Story/StoryForm/StoryAdd";

const Home = () => {
  const [category, setCategory] = useState("All");
  const [selectedStory, setSelectedStory] = useState(null);
  const { userId } = useSelector((state) => state.user);
  const { userStoriesPage, newStory, editStory } = useSelector(
    (state) => state.story
  );
  const dispatch = useDispatch();

  const handleCategoryClick = (newCategory) => {
    console.log(newCategory);
    setCategory(newCategory);
  };

  // Function to handle edit click event
  const handleEditClick = (story) => {
    setSelectedStory(story); // Set the selected story for editing
  };

  useEffect(() => {
    if (newStory || editStory) {
      dispatch(getStories(category));
      dispatch(getStoriesByUser(userId, userStoriesPage));
    } else {
      dispatch(getStories(category));
      dispatch(getStoriesByUser(userId, userStoriesPage));
    }
  }, [dispatch, category, userId, userStoriesPage, newStory, editStory]);

  return (
    <div>
      <CategoriesSection
        selectedCategory={category}
        handleCategoryClick={handleCategoryClick}
      />
      <StoryList onEditClick={handleEditClick} />
      {selectedStory && (
        <StoryAdd
          isStoryFormOpen={true}
          onClose={() => setSelectedStory(null)}
          editStory={selectedStory}
        />
      )}
    </div>
  );
};

export default Home;
