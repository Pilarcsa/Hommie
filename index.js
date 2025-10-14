import express from "express";
import { mongoConfig } from "./src/config/mongo-config.js";
import userRouter from "./src/components/users/user-router.js";
import authRouter from "./src/auth/auth-router.js"
import postRouter from "./src/components/posts/post-router.js"
import cookieParser from "cookie-parser";


process.env.NODE_ENV === "production" ? console.log("modo produccion") : console.log("modo desarrollo");

const app = express();

app.use(cookieParser());

//express.json nos sirve para procesar datos con json
app.use(express.json());// middlewear  son las reglas necesarias que se necesitan para poder dejar que una persona haga una solicitud a a la app

try {
    await mongoConfig()
}
catch (err) {
    console.error("error en la conexión de la base datos en mongodb", err);
    process.exit(1);
}

app.use("/api/user", userRouter);

app.use("/api/auth", authRouter);

app.use("/api/post", postRouter);

app.listen(process.env.PORT, () => {
    console.log("servidor corriendo en puerto localhost 3000.");
    console.log(process.env.PORT);
});

