const Story = require("../models/storyModel");
const User = require("../models/userModel");

// Bookmark a story
const bookmarkStory = async (req, res, next) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ errorMessage: "Story not found" });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ errorMessage: "User not found" });
    }
    if (user.bookmarks.includes(req.params.id)) {
      return res
        .status(400)
        .json({ errorMessage: "User already bookmarked", bookmarked: true, story });
    }
    story.bookmarks.push(req.user.id);
    // await story.save();
    user.bookmarks.push(req.params.id);
    // await user.save();
    await Promise.all([story.save(), user.save()]);
    res.json({
      message: "Story bookmarked successfully",
      story,
      bookmarked: true,
      bookmarks: user.bookmarks,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Bookmarks
const getAllBookmarks = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const bookmarks = await Story.find({ _id: { $in: user.bookmarks } }).sort({
      createdAt: -1,
    });
    res.json({ bookmarks });
  } catch (error) {
    next(error);
  }
};

module.exports = { bookmarkStory, getAllBookmarks };
