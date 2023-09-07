// models/machine.js
const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Machine name is required"],
      trim: true,
    },
 
    type: {
      type: String,
      required: [true, "Machine type is required"],
      trim: true,
    },

    serialNumber: {
      type: String,
      // required: [true, "Serial number is required"],
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
   


    // Add other machine attributes as needed

  },
  {
    timestamps: true,
  }
);

const Machine = mongoose.model("Machine", machineSchema);
module.exports = Machine;
