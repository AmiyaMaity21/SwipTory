const Story = require("../models/storyModel");
const User = require("../models/userModel");

// Like a story
const likeStory = async (req, res, next) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.likes.includes(req.params.id)) {
      return res
        .status(400)
        .json({ errorMessage: "User already liked this story", liked: true, story});
    }
    user.likes.push(req.params.id);
    story.likes.push(req.user.id);
    story.totalLikes = story.likes.length;
    await Promise.all([story.save(), user.save()]);
    res.json({
      message: "Story liked successfully",
      totalLikes: story.totalLikes,
      story,
      liked: true,
      likes: story.likes,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { likeStory };
