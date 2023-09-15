const express = require("express");
const router = express.Router();

const {
  createPost,
  updatePost,
  Postimage,
  allPosts,
  getPost,
  deletePost,
  
} = require("../controllers/postCtr");

const {
  requireSignIn,
  alowedTo,
  isBlocked,
} = require("../middlwares/authMiddlwares");

const {
  createPostValidator,
  removePostValidator,
  updatePostValidator,
  getPostValidator,
} = require("../utils/validators/postValidator");

// @desc Create Post
// @access Protect
router.post(
  "/",
  requireSignIn,
  alowedTo("admin", "user"),
  isBlocked,
  Postimage,
  createPostValidator,
  createPost
);

// @desc Update Post
// @access Protect
router.put(
  "/:id",
  requireSignIn,
  alowedTo("admin", "user"),
  updatePostValidator,
  updatePost
);

// @desc get all Post
// @access Protect
router.get("/",  allPosts);

// @desc get a single Post
// @access Protect
router.get(
  "/:id",
  getPostValidator,
  getPost
);

// @desc Delete a Post
// @access Protect
router.delete(
  "/:id",
  requireSignIn,
  alowedTo("admin", "user"),
  removePostValidator,
  deletePost
);

module.exports = router;
