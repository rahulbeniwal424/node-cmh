// models/machine.js
const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive"
    },
    name: {
      type: String,
      required: [true, "Plant name is required"],
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
    mcapicity: {
      type: String,
      required: [true, "Manufacture capicity  is required"],
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
    productiontillnow: {
      type: String,
      required: [true, "Production till now is required"],
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

const Plant = mongoose.model("Plant", plantSchema);
module.exports = Plant;
