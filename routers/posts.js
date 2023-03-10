const express = require("express");
const { postDataValidate, authenticateUser } = require("../middleware/middlewares");
const { getPosts, getIdPosts,postNewData,likePost,commentPost } = require("../controller/postfunctions");
  
const router = express.Router();

 
//get all posts
router.route("/get").get(authenticateUser, getPosts);

//get post with the given id
router.route("/:id").get( authenticateUser,getIdPosts);

//new post
router.route("/new").post(postDataValidate, postNewData);

//like a post
router.route("/likes/:id").post(likePost);

//comment on a post
router.route("/comment/:id").post(commentPost);


module.exports = router;