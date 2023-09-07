// controllers/machineController.js
const Machine = require("../model/Machine");
const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");
const User = require("../model/User");
// @desc Create Machine
exports.createMachine = asyncHandler(async (req, res) => {
  req.body.author = req.user._id;
  if (req.file) {
    req.body.image = req.file.path; // Set the image path in the request body
  }
  const machine = await Machine.create(req.body);
  // console.log("res1",res);
  // console.log("req1",req);
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { machines: machine._id },
    },
    { new: true }
  );
  res.status(201).send({ data: machine });
});
exports.allMachines = asyncHandler(async (req, res) => {
  const machine = await Machine.find().populate("author");
  const machines = machine.filter((item) => {
    return !item.author.blocked.includes(req.user._id);
  });
  res.status(200).json({ size: machines.length, data: machines });
});
exports.deleteMachine = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const  machine = await Machine.findById(id);
  if (!machine) {
    return next(new apiError(`No Machine for this id ${id}`));
  }

  // Check if The Post Belong To User
  // if (post.author.toString() !== req.user._id.toString()) {
  //   return next(new apiError(`You are not allowed to delete this post`, 403));
  // }

  await Machine.findByIdAndDelete(id);
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { machines: machine._id },
    },
    { new: true }
  );

  res.status(204).send();
});