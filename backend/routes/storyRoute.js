const express = require('express');
const storyController  = require('../controllers/storyController');
const likeController = require('../controllers/likeController');
const bookmarkController = require('../controllers/bookmarkController');
const {isAuthenticatedUser} = require('../middleware/authMiddleware');
const router = express.Router();

router.post("/create", isAuthenticatedUser, storyController.createStory);
router.get("/details/:id", storyController.getStoryDetailsById);
router.put("/edit/:id", isAuthenticatedUser, storyController.updateStoryDetailsById);
router.get("/all-stories", storyController.getAllStories);
router.put("/like/:id", isAuthenticatedUser, likeController.likeStory);
router.post("/bookmark/:id", isAuthenticatedUser, bookmarkController.bookmarkStory);
router.get("/bookmarks", isAuthenticatedUser, bookmarkController.getAllBookmarks);
module.exports = router;