const Plant = require('../model/Plant');

async function generatePlantCode(prefix) {
  try {
    const latestPlant = await Plant.findOne().sort({ id: -1 });

    let newId = 1001;

    if (latestPlant) {
      const latestId = latestPlant.id;
      const latestIdParts = latestId.split('-');
      if (latestIdParts.length === 2 && !isNaN(latestIdParts[1])) {
        newId = parseInt(latestIdParts[1]) + 1;
      } else {
        throw new Error(`Invalid ID format: ${latestId}`);
      }
    }

    const plantCode = `${prefix}-${newId}`;
    return plantCode;
  } catch (error) {
    throw new Error(`Error generating plant code: ${error.message}`);
  }
}

module.exports = generatePlantCode;
