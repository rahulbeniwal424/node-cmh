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
const { createPlant,allPlants,deletePlant, getPlantById, updatePlant } = require("../controllers/plantCtr");

// @desc Create Machine
// @access Protect
router.post("/", requireSignIn,isBlocked , alowedTo("admin", "user"),createPlantValidator,createPlant);
router.put('/:_id',requireSignIn, alowedTo("admin", "user"),createPlantValidator,updatePlant)
router.get("/",  allPlants);
router.delete(
    "/:id",
    requireSignIn,
    alowedTo("admin", "user"),
    removePlantValidator,
    deletePlant
  );
  router.get(
    "/:id",
    requireSignIn,
    alowedTo("admin", "user"),
    getPlantById
  );
// Add more routes as needed (update, get, delete)

module.exports = router;
