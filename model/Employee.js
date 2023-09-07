const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
  },
  achievement: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    unique: true,
    default: Date.now(), // Provide a default value
  }
});         

module.exports = mongoose.model('Employee', employeeSchema);
