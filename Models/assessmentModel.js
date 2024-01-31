import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "assessment name is required"],
      trim: true,
      unique:[true, "assessment name already exist in the database"],
    },
    description: {
      type: String,
      required: [true, "assessment description is required"], 
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
    }
  },
  { timestamps: true }
);

const Assessment = mongoose.model("Assessment", assessmentSchema);

export default Assessment;
