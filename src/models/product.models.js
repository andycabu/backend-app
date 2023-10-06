import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    referencia: {
      type: String,
      required: true,
      trim: true,
    },
    fechaCaducidad: {
      type: Date,
      trim: true,
    },
    categoria: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      trim: true,
    },
    options: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ user: 1, nombre: 1 }, { unique: true });
productSchema.index({ user: 1, referencia: 1 }, { unique: true });

export default mongoose.model("Product", productSchema);
