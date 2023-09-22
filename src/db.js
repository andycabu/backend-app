import { config } from "dotenv";
import mongoose from "mongoose";

// Cargar las variables de entorno desde un archivo .env
config();

// Obtener la cadena de conexión a la base de datos desde las variables de entorno
const dbURI = process.env.MONGODB_URI;

// Configurar y conectar a la base de datos MongoDB

export const connectDB = async () => {
  try {
    mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};
