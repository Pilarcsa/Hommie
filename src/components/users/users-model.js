import mongoose from 'mongoose';

// Define la estructura de los datos del usuario en la base de datos
const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        Comment: "id de usuario"
    },
    fullName: {
        type: String,
        required: true,
        Comment: "nombre de usuario"
    },
    email: {
        type: String,
        required: true,
        unique: true,
        Comment: "email del usuario"
    },
    password: {
        type: String,
        required: true,
        Comment: "contraseña del usuario"
    },
    age: {
        type: Number,
        required: true,
        Comment: "edad del usuario"
    },
    ocupation: {
        type: String,
        required: true,
        Comment: "ocupación del usuario"
    },
    avatarUrl: {
        type: String,
        required: true,
        Comment: "avatar del usuario"
    },
})

// Crea el modelo de usuario usando el esquema definido
const userModel = mongoose.model("user", userSchema)

export default userModel
