const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  category: String,
  timePeriod: String,
  stateLocation: String,
  status: {
    type: String,
    enum: ['new', 'in_progress', 'closed'],
    default: 'new'
  }
});

module.exports = mongoose.model('Enquiry', enquirySchema);
