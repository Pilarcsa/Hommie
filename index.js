import express from "express";


const app = express();
//express.json nos sirve para procesar datos con json
app.use(express.json());

app.get("/usuario", (req,res) => {

    res.send("respuesta ruta usuario");
});


app.get("/post/:id", (req,res) => {

    res.send(`el id recibido es:${req.params.id}`);
})

app.listen(process.env.PORT||3000,() => {
    console.log("servidor corriendo en puerto localhost 3000.");
    console.log(process.env.PORT);
});

