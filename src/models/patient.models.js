import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32,
  },

  age: {
    type: Number,
    required: true,
    trim: true,
    maxlength: 3,
  },

  address: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32,
  },
});

export default mongoose.model("Patient", patientSchema);
