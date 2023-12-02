const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
// Endpoint para generar el token JWT
/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Generar Token JWT
 *     description: Genera un token JWT para autenticación.
 *     requestBody:
 *       description: Credenciales del usuario
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token JWT generado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciales incorrectas
 */
router.post("/auth", (req, res) => {
  const usuario = {
    user: "vlliuya",
    pass: "vlliuya"
  };

  jwt.sign({ usuario }, "123456", (err, token) => {
    if (err) {
      res.status(500).json({ error: "Error al generar el token" });
    } else {
      res.json({ token });
    }
  });
});

module.exports = router;