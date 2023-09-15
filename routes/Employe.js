const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeCtr');
const {
    requireSignIn,
    alowedTo,
    isBlocked,
  } = require("../middlwares/authMiddlwares");
// Create an employee
router.post('/', requireSignIn, alowedTo("admin", "user"),employeeController.createEmployee);

// Delete an employee
router.delete('/:id',requireSignIn, alowedTo("admin", "user"), employeeController.deleteEmployee);
router.put('/:id',requireSignIn, alowedTo("admin", "user"), employeeController.updateEmployee);
router.get('/:id',requireSignIn, alowedTo("admin", "user"), employeeController.getEmployeeById);
router.get('/',requireSignIn,isBlocked , alowedTo("admin", "user"), employeeController.getAllEmployees);
module.exports = router;
