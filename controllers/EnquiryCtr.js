const Enquiry = require('../model/Enquiry');


exports.createEnquiry = async (req, res) => {
  const { name, email,phone, message, category, timePeriod, stateLocation } = req.body;

  try {
    const enquiry = await Enquiry.create({ name, email,phone, message, category, timePeriod, stateLocation });
    res.json({ success: true, enquiry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
exports.getAllEnquiries = async (req, res) => {
    try {
      const enquiries = await Enquiry.find();
      res.json({ success: true, enquiries });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };

exports.updateEnquiryStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const enquiry = await Enquiry.findByIdAndUpdate(id, { status }, { new: true });
    res.json({ success: true, enquiry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
