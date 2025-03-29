const express = require('express');
const { generarRespuesta } = require('gminiController.js');

const router = express.Router();
router.post('/chat', generarRespuesta);

module.exports = router;
