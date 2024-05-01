const express = require('express');
const storyController  = require('../controllers/storyController');
const {isAuthenticatedUser} = require('../middleware/authMiddleware');
const router = express.Router();

router.post("/create", isAuthenticatedUser, storyController.createStory);
router.get("/details/:id", storyController.getStoryDetailsById);
router.put("/edit/:id", isAuthenticatedUser, storyController.updateStoryDetailsById);
router.get("/all-stories", storyController.getAllStories);
router.put("/like/:id", isAuthenticatedUser, storyController.likeStory);
router.post("/bookmark/:id", isAuthenticatedUser, storyController.bookmarkStory);
router.get("/bookmarks", isAuthenticatedUser, storyController.getAllBookmarks);

module.exports = router;