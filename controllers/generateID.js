
let lastEmployeeCode = 1000; // Initialize with the starting code
const Employee = require('../model/Employee'); 
// Generate unique employee code with a four-digit prefix
async function generateEmployeeCode(prefix) {
  const latestEmployee = await Employee.findOne().sort({ id: -1 });

  let newId = 1001; // Assuming initial ID is 1000 if no employee exists yet

  if (latestEmployee) {
    newId = parseInt(latestEmployee.id.split('-')[1]) + 1;
  }

  const employeeCode = `${prefix}-${newId}`;
  return employeeCode;
}

module.exports = generateEmployeeCode;