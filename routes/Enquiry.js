const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/EnquiryCtr');

router.post('/', enquiryController.createEnquiry);
router.put('/:id/status', enquiryController.updateEnquiryStatus);
router.get('/', enquiryController.getAllEnquiries); // New route

module.exports = router;
