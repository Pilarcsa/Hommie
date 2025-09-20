import express from "express";
process.env.NODE_ENV === "production"? console.log("modo produccion"):console.log("modo desarrollo");

const app = express();
//express.json nos sirve para procesar datos con json
app.use(express.json());

app.get("/usuario", (req,res) => {

    res.send("respuesta ruta usuario");
});


app.get("/post/:id", (req,res) => {

    res.send(`el id recibido es:${req.params.id}`);
})

app.listen(process.env.PORT,() => {
    console.log("servidor corriendo en puerto localhost 3000.");
    console.log(process.env.PORT);
});

