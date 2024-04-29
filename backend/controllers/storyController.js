const Story = require("../models/storyModel");
const User = require("../models/userModel");
// Create a new story
const createStory = async (req, res, next) => {
  try {
    const { slides } = req.body;
    if (!slides) {
      return res
        .status(400)
        .json({ errorMessage: "Please fill all the required fields" });
    }
    const story = new Story({
      slides,
      createdBy: req.user.id,
    });
    await story.save();
    res.status(201).json({ success: true, story });
  } catch (error) {
    next(error);
  }
};

// Get a story details
const getStoryDetailsById = async (req, res, next) => {
  try {
    let story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }
    const totalLikes = story.likes.length;
    const user = await User.findById(req.query.user);
    if (user) {
      const liked = user.likes.includes(req.params.id);
      const bookmarked = user.likes.includes(req.params.id);
      return res.status(200).json({
        success: true,
        likes: liked,
        bookmarks: bookmarked,
        totalLikes,
        story,
      });
    } else {
      return res.status(200).json({ success: true, totalLikes, story });
    }
  } catch (error) {
    next(error);
  }
};

// Update a story
const updateStoryDetailsById = async (req, res, next) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }
    const createdBy = req.user.id;
    const { slides } = req.body;
    if (!slides || !createdBy) {
      return res
        .status(400)
        .json({ errorMessage: "Please fill all the required fields" });
    }
    const updatedStory = await Story.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true, useFindAndModify: false }
    );
    res.status(200).json({ success: true, story: updatedStory });
  } catch (error) {
    next(error);
  }
};

// Get all stories
const getAllStories = async (req, res, next) => {
  try {
    const categories = [
      "food",
      "health and fitness",
      "travel",
      "movies",
      "education",
    ];
    const { userId, category, catLimit, cat } = req.query;
    let page = parseInt(req.query.page) || 1;
    let limit = 4 * page;
    let skip = 0;

    if (userId) {
      stories = await Story.find({ createdBy: userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    } else if (category && category.toLowerCase() == "all") {
      const groupedStories = {};
      await Promise.all(
        categories.map(async (category) => {
          const categoryStories = await Story.find({
            slides: { $elemMatch: { category: category } }, // Find stories with slides that match the current category
          })
            .sort({ createdAt: -1 }) // Sort the stories by creation date, newest first
            .skip(skip)
            .limit(cat === category ? catLimit : 4); // Limit the number of stories to retrieve per category

          // Add the category and its stories to the groupedStories object
          groupedStories[category] = categoryStories;
        })
      );
      return res
        .status(200)
        .json({ success: true, stories: groupedStories, page });
    } else {
      const categoryStories = {};
      const stories = await Story.find({
        slides: { $elemMatch: { category: category } },
      })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
        categoryStories[category] = stories;
      return res.status(200).json({ success: true, stories:categoryStories, page });
    }
    res.status(200).json({ success: true, stories, page });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStory,
  getStoryDetailsById,
  updateStoryDetailsById,
  getAllStories,
};
