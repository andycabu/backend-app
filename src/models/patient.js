import { model, models, Schema } from "mongoose";

const patientSchema = new Schema({
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

export default models.Patient || model("Patient", patientSchema);
