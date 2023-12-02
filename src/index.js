const express = require("express");
const mongoose = require("mongoose");
const consultaRuc = require("./router/consulta");
const jwt = require("jsonwebtoken");
const cors = require('cors');
const auth = require("./router/auth")
require("dotenv").config()
const swaggerUI = require("swagger-ui-express")
const swaggerJSDoc = require("swagger-jsdoc")
const path = require("path")

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

const swaggerConf = {
    definition:{
        openapi : "3.0.0",
        info : {
            title : "Api Documentación - Registro de personas jurídicas",
            version: "1.0.0"
        },
        servers:[
            {
                url: "http://localhost:5000"
            }
        ]
    },
    apis:  [ ` ${path.join(__dirname, "./router/*.js")} ` ]
}
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  })
app.use("/api", auth);
app.use("/api",verificaJWT, consultaRuc);
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(swaggerConf)))

mongoose.connect(process.env.bd_uri)
    .then(() => { console.log("Conexión realizada con éxito") })
    .catch((error) => { console.log(error) })

app.listen(port, () => { console.log("servidor escuchando en el puerto " + port) })