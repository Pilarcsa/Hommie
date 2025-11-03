import express from "express";
import { mongoConfig } from "./src/config/mongo-config.js";
import userRouter from "./src/components/users/user-router.js";
import authRouter from "./src/auth/auth-router.js"
import postRouter from "./src/components/posts/post-router.js"
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";

// Indica si la aplicación se ejecuta en modo producción o desarrollo
process.env.NODE_ENV === "production" ? console.log("modo produccion") : console.log("modo desarrollo");

const app = express();

// Configura middlewares de seguridad y parsing
app.use(cookieParser());
app.use(helmet());
app.use(express.json());

// Configuración de CORS con lista blanca de dominios permitidos
const whiteList = ["http://localhost:5173", "https://hommie-front-teal.vercel.app/" ];
const corsOptions = { 
    origin: (origin, callback) => {
        if (whiteList.includes(origin)) {
            callback(null, true);
        } else {
            console.log(origin);
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
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);

// Inicializa el servidor
app.listen(process.env.PORT, () => {
    console.log("servidor corriendo en puerto localhost 3000.");
    console.log(process.env.PORT);
});
