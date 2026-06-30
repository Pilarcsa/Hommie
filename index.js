import express from "express";
import dotenv from "dotenv";
import { mongoConfig } from "./src/config/mongo-config.js";
import userRouter from "./src/components/users/user-router.js";
import authRouter from "./src/auth/auth-router.js"
import postRouter from "./src/components/posts/post-router.js"
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
dotenv.config();

// Indica si la aplicación se ejecuta en modo producción o desarrollo
process.env.NODE_ENV === "production" ? console.log("modo produccion") : console.log("modo desarrollo");

const app = express();
app.set('trust proxy', 1)  
// Configura middlewares de seguridad y parsing
app.use(cookieParser());
app.use(helmet());
app.use(express.json());

// Configuración de CORS con lista blanca de dominios permitidos
const whiteList = ["http://localhost:5173", "https://hommie-front.netlify.app"];
const corsOptions = { 
    origin: (origin, callback) => {
        if (whiteList.includes(origin)|| !origin) {
            callback(null, true);
        } else {
            console.log("Origen denegado:", origin);
            callback(new Error("no esta permitido por Cors"));
        }
    },
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
};

app.use(cors(corsOptions));

// Conexión con la base de datos MongoDB
try {
    await mongoConfig();
} catch (err) {
    console.error("error en la conexión de la base datos en mongodb", err);
    process.exit(1);
}

// Rutas principales de la API
app.use("/api/profile", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);

// Middleware 404: cuando la ruta no existe
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Ruta no encontrada',
    status: 404
  });
});

// Inicializa el servidor
app.listen(process.env.PORT, () => {
    console.log("servidor corriendo en puerto localhost 3000.");
    console.log(process.env.PORT);
});


// Función para cerrar todo limpiamente
const gracefulShutdown = async (signal) => {
console.log('Recibida señal ${signal}. Cerrando el servidor de forma limpia...');

try {
// 1. Cerrar la conexión de Mongoose
await mongoose.connection.close();
console.log('Conexión a MongoDB cerrada correctamente.');

// 2. Salir del proceso de Node
process.exit(0);
} catch (err) {
console.error('Error al cerrar la conexión de MongoDB:', err);
process.exit(1);
}
};

// Escuchar señales de apagado del sistema
process.on('SIGINT', () => gracefulShutdown('SIGINT')); // Ctrl+C en la terminal
process.on('SIGTERM', () => gracefulShutdown('SIGTERM')); // Señal de parada de producción (Docker/PM2)