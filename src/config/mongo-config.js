import mongoose from "mongoose";


export async function mongoConfig() {
    try{
        const mongoUri = process.env.MONGO_URI
        await mongoose.Connection(mongoUri)
        console.log("mongodb conectado correctamente");
    }
    catch(err){
        console.error("error en la conexión de la base datos en mongodb", err);
        

    }

 }