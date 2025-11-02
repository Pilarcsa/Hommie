import mongoose from 'mongoose';

// Conecta la aplicación a la base de datos MongoDB usando la URI del entorno
export async function mongoConfig() {
    try{
        const mongoUri = process.env.MONGO_URI
        await mongoose.connect(mongoUri)
        console.log("mongodb conectado correctamente");
    }
    catch(err){
        // Maneja errores de conexión a la base de datos
        console.error("error en la conexión de la base datos en mongodb", err);
    }
}
