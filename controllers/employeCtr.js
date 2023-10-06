
const Employee = require('../model/Employee'); // Correct the import path
const generateID = require('./generateID'); // Import the generateID function
const fs = require('fs');
const path = require('path');
// Create an employee
exports.createEmployee = async (req, res) => {
  try {
    console.log(req.body); // Log the request body
    const { name,image, email, phone,designation,totalexperience,language,dob,workingexperience,
      jobprofie,nationality,specialization,techqulification,acedmicqulification,fathername,
      marriedstatus,gender,aadharno,address } = req.body;
      const imageBuffer = Buffer.from(image, 'base64');

      // Generate a unique filename for the image
      const filename = `employee_${Date.now()}.jpg`;
  
      // Define the file path where the image will be saved
      const filePath = path.join(__dirname, '../images', filename);
  
      // Write the image buffer to the file
      fs.writeFileSync(filePath, imageBuffer);
  
    const existingEmployee = await Employee.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingEmployee) {
      return res.status(400).json({ error: 'Employee with the same email or phone already exists' });
    }
    const id = generateID('cmh'); // Use the generateID function
    const employee = new Employee({ name,image, email, phone,language,designation,totalexperience,dob,workingexperience,
      jobprofie,specialization,techqulification,acedmicqulification,fathername,marriedstatus,gender,
      aadharno,nationality,address,id });
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const idToGet = req.params.id;
    console.log('Requested employee ID:', idToGet); // Log the requested ID

    const employee = await Employee.findOne({ id: idToGet });

    if (employee) {
      res.json(employee);
    } else {
      console.log('Employee not found for ID:', idToGet); // Log that the employee was not found
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const idToUpdate = req.params.id;
    console.log('Requested employee ID for update:', idToUpdate);

    const updatedData = req.body;

    const updatedEmployee = await Employee.findOneAndUpdate(
      { id: idToUpdate },
      { $set: updatedData },
      { new: true }
    );

    if (updatedEmployee) {
      res.json(updatedEmployee);
    } else {
      console.log('Employee not found for update:', idToUpdate);
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.getAllEmployees = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    let filter = {};
    if (searchTerm) {
      // If a search term is provided, add conditions for filtering
      filter = {
        $or: [
          { designation: { $regex: new RegExp(searchTerm, 'i') } }, // Case-insensitive search on name
          { name: { $regex: new RegExp(searchTerm, 'i') } }, // Case-insensitive search on model
          { mobile: { $regex: new RegExp(searchTerm, 'i') } }, // Case-insensitive search on state
          { email: { $regex: new RegExp(searchTerm, 'i') } }, // Case-insensitive search on state
          { cmhId: { $regex: new RegExp(searchTerm, 'i') } }, // Case-insensitive search on state
          { mobile: { $regex: new RegExp(searchTerm, 'i') } }, // Case-insensitive search on state
        ],
      };
    }
  

    const employees = await Employee.find(filter)
    res.status(200).json({
      data: employees,
      size: employees.length,
    });
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
