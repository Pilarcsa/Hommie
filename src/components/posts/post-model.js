import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        Comment: "id de usuario"
    },
    title: {
        type: String,
        required: true,
        Comment: `titulo del post del usuario`
    },
    description: {
        type: String,
        required: true,
        Comment: `post del usuario`
    },
    city: {
        type: String,
        required: true,
        trim: true,
        comment: "Ciudad o zona donde busca piso",
    },

    budget: {
        type: Number,
        required: true,
        comment: "Presupuesto mensual (€)",
    },
      duration: {
    type: Number,
    default: null,
    comment: "Duración de estancia en meses (opcional)",
  },
   mode: {
    type: String,
    enum: ["solo", "pareja"],
    default: "solo",
    comment: "Modalidad de convivencia",
  },
   // Preferencias
  preferences: {
    noSmokers: { type: Boolean, default: false },
    pets: { type: Boolean, default: false },
    workFromHome: { type: Boolean, default: false },
    ensuite: { type: Boolean, default: false },
  },

  // Imagen
  photo: {
    type: String,
    default: "",
    comment: "URL o base64 de la foto subida (opcional)",
  },

  // Estado del post
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "published",
    comment: "Estado del post según el botón pulsado",
  },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }

});

const postModel = mongoose.model("post", postSchema)

export default postModel;