import mongoose from 'mongoose';

// Define el esquema del post con referencias, tipos y validaciones
const postSchema = new mongoose.Schema({
  userId: {
    type: Number,
    ref: "User",
    required: true,
    index: true,
  },
  title: { type: String },
  description: { type: String },
  city: { type: String },
  budget: { type: Number },
  duration: { type: Number, default: null },
  mode: { type: String, enum: ["solo", "pareja"], default: "solo" },
  rent: { type: String, enum: ["sin piso", "con piso en alquiler"], default: "sin piso" },
  preferences: {
    noSmokers: { type: Boolean, default: false },
    pets: { type: Boolean, default: false },
    workFromHome: { type: Boolean, default: false },
    ensuite: { type: Boolean, default: false }
  },
  photo: { type: String, default: "" },
  status: { type: String, enum: ["draft", "published"], default: "published" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Crea el modelo de Mongoose basado en el esquema
const postModel = mongoose.model("post", postSchema);

// Exporta el modelo para usarlo en servicios o controladores
export default postModel;
