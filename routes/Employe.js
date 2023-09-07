const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeCtr');
const {
    requireSignIn,
    alowedTo,
    isBlocked,
  } = require("../middlwares/authMiddlwares");
// Create an employee
router.post('/', requireSignIn,isBlocked , alowedTo("admin", "user"),employeeController.createEmployee);

// Delete an employee
router.delete('/:id',requireSignIn,isBlocked , alowedTo("admin", "user"), employeeController.deleteEmployee);
router.get('/',requireSignIn,isBlocked , alowedTo("admin", "user"), employeeController.getAllEmployees);
module.exports = router;
