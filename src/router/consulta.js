const express = require("express");
const axios = require("axios")
const router = express.Router();
const consultaModel = require("../models/consulta");
const jwt = require("jsonwebtoken");

 router.post("/register", async (req, res) => {

    const ruc = req.body.ruc;
    const tipo = req.body.tipo;
    console.log(req.usuario)
    const webservice = "http://wsruc.com/Ruc2WS_JSON.php?tipo="+tipo+"&ruc="+ruc+"&token=cXdlcnR5bGFtYXJja19zYUBob3RtYWlsLmNvbXF3ZXJ0eQ==";
    try {
        const response = await axios.get(webservice);
        res.json(response.data)
        const consulta = consultaModel(response.data)
        consulta.save();
      } catch (error) {
        console.error('Error al hacer la solicitud:', error.message);
      }
});

module.exports = router;