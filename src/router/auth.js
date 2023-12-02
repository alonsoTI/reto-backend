const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

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