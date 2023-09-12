// models/machine.js
const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Plant name is required"],
      trim: true,
    },
 
    description: {
      type: String,
      required: [true, "Plant description is required"],
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
