const express = require("express");
const mongoose = require("mongoose");
const consultaRuc = require("./router/consulta");
const jwt = require("jsonwebtoken");
const cors = require('cors');
const auth = require("./router/auth")
require("dotenv").config()
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const verificaJWT = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ mensaje: "Sin acceso a recurso protegido" });
    } 
    try {
        const verificaJwt = jwt.verify(token, "123456"); 
        req.usuario = verificaJwt;
        next();
    } catch (error) {
        res.status(400).json({ mensaje: "Token no válido" });
    }
}
app.use("/api", auth);
app.use("/api",verificaJWT, consultaRuc);

mongoose.connect(process.env.bd_uri)
    .then(() => { console.log("Conexión realizada con éxito") })
    .catch((error) => { console.log(error) })

app.listen(port, () => { console.log("servidor escuchando en el puerto " + port) })