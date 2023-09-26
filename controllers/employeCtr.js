
const Employee = require('../model/Employee'); // Correct the import path
const generateID = require('./generateID'); // Import the generateID function

// Create an employee
exports.createEmployee = async (req, res) => {
  try {
    console.log(req.body); // Log the request body
    const { name,image, email, phone,designation,totalexperience,language,dob,workingexperience,
      jobprofie,nationality,specialization,techqulification,acedmicqulification,fathername,
      marriedstatus,gender,aadharno,address } = req.body;
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
    const { designation, name, mobile, email, cmhId, page, pageSize } = req.query;

    let filter = {};

    if (designation) {
      filter.designation = designation;
    }

    if (name) {
      filter.name = { $regex: new RegExp(name, 'i') };
    }

    if (mobile) {
      filter.phone = mobile;
    }

    if (email) {
      filter.email = { $regex: new RegExp(email, 'i') };
    }

    if (cmhId) {
      filter.id = cmhId;
    }

    const currentPage = parseInt(page) || 1;
    const itemsPerPage = parseInt(pageSize) || 10;
    const skip = (currentPage - 1) * itemsPerPage;

    const totalItems = await Employee.countDocuments(filter);

    const employees = await Employee.find(filter)
      .skip(skip)
      .limit(itemsPerPage);

    res.status(200).json({
      data: employees,
      currentPage,
      totalPages: Math.ceil(totalItems / itemsPerPage),
      totalItems
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
