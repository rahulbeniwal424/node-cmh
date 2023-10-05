// routes/machineRoutes.js
const express = require("express");
const router = express.Router();
const {
    requireSignIn,
    alowedTo,
    isBlocked,
  } = require("../middlwares/authMiddlwares");
  const {
    createMachineValidator,
    removeMachineValidator,
  } = require("../utils/validators/machineValidator");
const { createMachine,allMachines,deleteMachine,getMachineId, updateMachine } = require("../controllers/machineCtr");

// @desc Create Machine
// @access Protect
router.post("/", requireSignIn,isBlocked , alowedTo("admin", "user"),createMachineValidator,createMachine);
router.get("/", requireSignIn , alowedTo("admin", "user"), allMachines);
router.put('/:_id',requireSignIn, alowedTo("admin", "user"),createMachineValidator,updateMachine)
router.delete(
    "/:id",
    requireSignIn,
    alowedTo("admin", "user"),
    removeMachineValidator,
    deleteMachine
  );
  router.get(
    "/:id",
    requireSignIn,
    alowedTo("admin", "user"),
    getMachineId
  );
// Add more routes as needed (update, get, delete)

module.exports = router;
