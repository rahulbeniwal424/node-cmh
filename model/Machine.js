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
