const express = require("express");
const axios = require("axios")
const router = express.Router();
const consultaModel = require("../models/consulta");
const jwt = require("jsonwebtoken");

/**
 * @openapi
 * components:
 *   schemas:
 *     Consulta:
 *       type: object
 *       properties:
 *         ruc:
 *           type: string
 *           description: Número de RUC
 *         razonSocial:
 *           type: string
 *           description: Razón Social
 *         estado:
 *           type: string
 *           description: Estado 
 *         direccion:
 *           type: string
 *           description: Dirección 
 *         distrito:
 *           type: string
 *           description: Distrito 
 *         departamento:
 *           type: string
 *           description: Departamento 
 *         provincia:
 *           type: string
 *           description: Provincia 
 *         ubigeo:
 *           type: string
 *           description: Código de ubigeo 
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Envìo de ruc y tipo para obtener los demàs datos
 *     description: Registra información utilizando un servicio web externo basado en el RUC y el tipo.
 *     tag: [Consulta]
 *     requestBody:
 *       description: Datos para el registro
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ruc:
 *                 type: string
 *                 description: Número de RUC
 *               tipo:
 *                 type: string
 *                 description: Tipo de RUC
 *     responses:
 *       200:
 *         description: Ejecución correcta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Error al realizar la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 */
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