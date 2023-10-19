// models/machine.js
const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "category name is required"],
      trim: true,
    },
    model: {
      type: String,
      required: [true, "model name is required"],
      trim: true,
    },
    myear: {
      type: String,
      required: [true, "Manufacture Year  is required"],
      trim: true,
    },
    salevalue: {
      type: String,
    },
    hirevalue: {
      type: String,
 
    },
    state: {
      type: String,
      required: [true, "state is required"],
      trim: true,
    },

    image: {
        type: String,
        
      },
  
    id: {
      type: String,
      unique: true,
      default: Date.now(), // Provide a default value
    }
    // Add other machine attributes as needed

  },
  
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Machine", machineSchema);
