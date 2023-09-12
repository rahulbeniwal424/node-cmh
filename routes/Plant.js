// routes/machineRoutes.js
const express = require("express");
const router = express.Router();
const {
    requireSignIn,
    alowedTo,
    isBlocked,
  } = require("../middlwares/authMiddlwares");
  const {
    createPlantValidator,
    removePlantValidator,
  } = require("../utils/validators/plantValidator");
const { createPlant,allPlants,deletePlant } = require("../controllers/plantCtr");

// @desc Create Machine
// @access Protect
router.post("/", requireSignIn,isBlocked , alowedTo("admin", "user"),createPlantValidator,createPlant);
router.get("/", requireSignIn , alowedTo("admin", "user"), allPlants);
router.delete(
    "/:id",
    requireSignIn,
    alowedTo("admin", "user"),
    removePlantValidator,
    deletePlant
  );
// Add more routes as needed (update, get, delete)

module.exports = router;
