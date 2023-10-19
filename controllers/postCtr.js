const Post = require("../model/Post");
const User = require("../model/User");
const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");
const handlers = require("./handlersFactory");
const storage = require("../config/cloudinary");
const multer = require("multer");
const upload = multer({ storage: storage });

exports.Postimage = (req, res, next) => {
  console.log("==========", req.body);
  upload.single("image")(req, res, function (err) {
    console.log(err);
    if (err) {
      return next(err);
    }
    next();
  });
};
exports.createPost = [
  upload.single("image"), // Handle image upload
  asyncHandler(async (req, res) => {
    req.body.author = req.user._id;
    // Check if an image was uploaded
    if (req.file) {
      req.body.image = req.file.path; // Set the image path in the request body
    }

    const post = await Post.create(req.body);

    // Associate user to post
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { posts: post._id },
      },
      { new: true }
    );

    res.status(201).send({ data: post });
  }),
];
// @desc Update Post
exports.updatePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) {
    return next(new apiError(`No Post for this id ${id}`));
  }

  // Check if The Post Belong To User
  if (post.author.toString() !== req.user._id.toString()) {
    return next(new apiError(`You are not allowed to update this post`, 403));
  }

  const doc = await Post.findOneAndUpdate(post._id, req.body, { new: true });

  res.status(200).json({ data: doc });
});

// @desc Get List of Posts
// exports.allPosts = asyncHandler(async (req, res) => {
//   const post = await Post.find().populate("author");

//   const posts = post.filter((item) => {
//     return !item.author.blocked.includes(req.user._id);
//   });

//   res.status(200).json({ size: posts.length, data: posts });
// });

// @desc Get a single post
// exports.getPost = asyncHandler(async (req, res, next) => {
//   const post = await Post.findById(req.params.id).populate("author");

//   if (!post) {
//     return next(new apiError(`No post for this id ${req.params.id}`, 404));
//   }

//   if (post.author.blocked.includes(req.user._id)) {
//     return next(
//       new apiError(`Sorry, You Are Not Allowed to Access This Post`, 403)
//     );
//   }

//   res.send(post);
// });
exports.allPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate("author");

  // const simplifiedPosts = posts.map((post) => {
  //   if (post.author.blocked.includes(req.user._id)) {
  //     // If the author is blocked, return null to filter it out
  //     return null;
  //   }

  //   // Create a simplified author object with only first name and _id
  //   const simplifiedAuthor = {
  //     _id: post.author._id,
  //     firstname: post.author.firstname,
  //   };

  //   // Create a new post object with the simplified author
  //   const simplifiedPost = {
  //     _id: post._id,
  //     title: post.title,
  //     description: post.description,
  //     image: post.image,
  //     comments: post.comments,
  //     author: simplifiedAuthor,
  //     // Add other fields you want to include in the response
  //   };

  //   return simplifiedPost;
  // }).filter((post) => post !== null); // Remove null entries (blocked authors)

  res.status(200).json({ size: posts.length, data: posts });
});

exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate("author");

  if (!post) {
    return next(new apiError(`No post for this id ${req.params.id}`, 404));
  }

  if (post.author.blocked.includes(req.user._id)) {
    return next(
      new apiError(`Sorry, You Are Not Allowed to Access This Post`, 403)
    );
  }

  // Create a simplified author object with only first name and _id
  const simplifiedAuthor = {
    _id: post.author._id,
    firstname: post.author.firstname,
  };

  // Create a new post object with the simplified author
  const simplifiedPost = {
    _id: post._id,
    title: post.title,
    description: post.description,
    image: post.image,
    author: simplifiedAuthor,
    // Add other fields you want to include in the response
  };
  
console.log(simplifiedPost);
  res.send(simplifiedPost);
});

// @desc Delete Post
exports.deletePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findById(id);
  if (!post) {
    return next(new apiError(`No Post for this id ${id}`));
  }

  // Check if The Post Belong To User
  if (post.author.toString() !== req.user._id.toString()) {
    return next(new apiError(`You are not allowed to delete this post`, 403));
  }

  await Post.findByIdAndDelete(id);

  //
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { posts: post._id },
    },
    { new: true }
  );

  res.status(204).send();
});
