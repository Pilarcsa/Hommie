import express from "express";
import { mongoConfig } from "./src/config/mongo-config";

process.env.NODE_ENV === "production" ? console.log("modo produccion") : console.log("modo desarrollo");

const app = express();
//express.json nos sirve para procesar datos con json
app.use(express.json());

try {
    await mongoConfig()
    console.log("mongodb conectado correctamente");
}
catch (err) {
    console.error("error en la conexión de la base datos en mongodb", err);
    process.exit(1);
}
app.get("/usuario", (req, res) => {

    res.send("respuesta ruta usuario");
});


app.get("/post/:id", (req, res) => {

    res.send(`el id recibido es:${req.params.id}`);
})

app.listen(process.env.PORT, () => {
    console.log("servidor corriendo en puerto localhost 3000.");
    console.log(process.env.PORT);
});

