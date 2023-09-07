
let lastEmployeeCode = 1000; // Initialize with the starting code

// Generate unique employee code with a four-digit prefix
function generateEmployeeCode(prefix) {
  lastEmployeeCode++; // Increment the last code for each new employee
  const employeeCode = `${prefix}-${lastEmployeeCode}`;
  return employeeCode;
}

module.exports = generateEmployeeCode;