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
const { createMachine,allMachines,deleteMachine } = require("../controllers/machineCtr");

// @desc Create Machine
// @access Protect
router.post("/", requireSignIn,isBlocked , alowedTo("admin", "user"),createMachineValidator,createMachine);
router.get("/", requireSignIn , alowedTo("admin", "user"), allMachines);
router.delete(
    "/:id",
    requireSignIn,
    alowedTo("admin", "user"),
    removeMachineValidator,
    deleteMachine
  );
// Add more routes as needed (update, get, delete)

module.exports = router;
