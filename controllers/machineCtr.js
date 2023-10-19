// controllers/machineController.js
const Machine = require('../model/Machine');
const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");
const User = require("../model/User");
const generateMachineCode = require('./machinegenerateID');
// @desc Create Machine
exports.createMachine = async (req, res) => {
  try {
    const { category, model, myear, salevalue, hirevalue, state, image } = req.body;

    const id = await generateMachineCode('M');

    const machine = new Machine({ id, category, model, myear, salevalue, hirevalue, state, image });
    await machine.save();

    res.status(201).send({ data: machine });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.updateMachine = async (req, res) => {
  try {
    const idToUpdate = req.params._id;
    console.log('Requested employee ID for update:', idToUpdate);

    const updatedData = req.body;

    const updatedmachine = await Machine.findOneAndUpdate(
      { _id: idToUpdate },
      { $set: updatedData },
      { new: true }
    );

    if (updatedmachine) {
      res.json(updatedmachine);
    } else {
      console.log('Machine not found for update:', idToUpdate);
      res.status(404).json({ message: 'Machine not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.getMachineId = async (req, res) => {
  try {   
    const idToGet = req.params.id;
    console.log('Requested machine ID:', idToGet); // Log the requested ID

    const machine = await Machine.findOne({ id: idToGet });

    if (machine) {
      res.json(machine);
    } else {
      console.log('machine not found for ID:', idToGet); // Log that the employee was not found
      res.status(404).json({ message: 'machine not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.allMachines = async (req, res) => {
  const searchTerm = req.query.searchTerm; // Get the search term from the query parameter

  let filter = {}; // Initialize an empty filter object

  if (searchTerm) {
    // If a search term is provided, add conditions for filtering
    filter = {
      $or: [
        { category: { $regex: new RegExp(searchTerm, 'i') } }, // Case-insensitive search on name
        { model: { $regex: new RegExp(searchTerm, 'i') } }, // Case-insensitive search on model
        { state: { $regex: new RegExp(searchTerm, 'i') } }, // Case-insensitive search on state
      ],
    };
  }

  const machines = await Machine.find(filter)

  res.status(200).json({ size: machines.length, data: machines });
};
exports.deleteMachine = async (req, res, next) => {
  const { id } = req.params;

  const machine = await Machine.findById(id);
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

  res.status(200).json({ message: 'Machine Deleted' });;
};
