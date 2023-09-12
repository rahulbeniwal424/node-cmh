const Plant = require("../model/Plant");
const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");
const User = require("../model/User");
exports.createPlant = asyncHandler(async (req, res) => {
  req.body.author = req.user._id;
  if (req.file) {
    req.body.image = req.file.path; // Set the image path in the request body
  }
  const plant = await Plant.create(req.body);
  // console.log("res1",res);
  // console.log("req1",req);
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { plants: plant._id },
    },
    { new: true }
  );
  res.status(201).send({ data: plant });
});
exports.allPlants = asyncHandler(async (req, res) => {
  const plant = await Plant.find().populate("author");
  const plants = plant.filter((item) => {
    return !item.author.blocked.includes(req.user._id);
  });
  res.status(200).json({ size: plants.length, data: plants });
});
exports.deletePlant = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const  plant = await Plant.findById(id);
  if (!plant) {
    return next(new apiError(`No Plant for this id ${id}`));
  }

  // Check if The Post Belong To User
  // if (post.author.toString() !== req.user._id.toString()) {
  //   return next(new apiError(`You are not allowed to delete this post`, 403));
  // }

  await Plant.findByIdAndDelete(id);
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { plants: plant._id },
    },
    { new: true }
  );

  res.status(204).send();
});
