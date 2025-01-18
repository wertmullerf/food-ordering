import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("Conexión a MongoDB exitosa");
  } catch (err) {
    console.error("Error al conectar a MongoDB", err);
    process.exit(1); // Termina el proceso en caso de error
  }
};
