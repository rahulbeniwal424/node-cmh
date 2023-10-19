const Machine = require('../model/Machine');

async function generateMachineCode(prefix) {
  try {
    const latestMachine = await Machine.findOne().sort({ id: -1 });

    let newId = 1001;

    if (latestMachine) {
      const latestId = latestMachine.id;
      const latestIdParts = latestId.split('-');
      if (latestIdParts.length === 2 && !isNaN(latestIdParts[1])) {
        newId = parseInt(latestIdParts[1]) + 1;
      } else {
        throw new Error(`Invalid ID format: ${latestId}`);
      }
    }

    const machineCode = `${prefix}-${newId}`;
    return machineCode;
  } catch (error) {
    throw new Error(`Error generating machine code: ${error.message}`);
  }
}

module.exports = generateMachineCode;
