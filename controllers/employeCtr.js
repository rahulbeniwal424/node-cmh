
const Employee = require('../model/Employee'); // Correct the import path
const generateID = require('./generateID'); // Import the generateID function

// Create an employee
exports.createEmployee = async (req, res) => {
  try {
    console.log(req.body); // Log the request body
    const { name,image, email, phone,designation,position,age,address,experience,specialization,achievement } = req.body;
    const existingEmployee = await Employee.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingEmployee) {
      return res.status(400).json({ error: 'Employee with the same email or phone already exists' });
    }
    const id = generateID('cmh'); // Use the generateID function
    const employee = new Employee({ name,image, email, phone,designation,position,age,address,experience,specialization,achievement,id });
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Delete an employee
exports.deleteEmployee = async (req, res) => {
  try {
    const idToDelete = req.params.id;
    const deletedEmployee = await Employee.findOneAndDelete({ id: idToDelete });
    if (deletedEmployee) {
      res.json(deletedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Internal server error' });
  }
};
