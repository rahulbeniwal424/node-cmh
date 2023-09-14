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
  totalexperience: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  workingexperience: {
    type: String,
    required: true,
  },
  jobprofie: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
  },
  techqulification: {
    type: String,
    required: true,
  },
  acedmicqulification: {
    type: String,
    required: true,
  },

  fathername: {
    type: String,
    required: true,
  },
  marriedstatus: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  aadharno: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  nationalility: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  language: {
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
