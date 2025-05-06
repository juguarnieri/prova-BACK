const express = require("express");
const router = express.Router();
const {
    exportParticipantsPDF,
    exportEventsPDF
} = require("../controllers/reportController");

const apiKeyMiddleware = require("../config/apiKey");

router.use(apiKeyMiddleware);

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Rotas para exportação de relatórios
 */

/**
 * @swagger
 * /api/reports/participants/export/pdf:
 *   get:
 *     summary: Exporta participantes em PDF
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: PDF gerado com sucesso
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Erro ao gerar o PDF
 */
router.get("/participants/export/pdf", exportParticipantsPDF);

/**
 * @swagger
 * /api/reports/events/export/pdf:
 *   get:
 *     summary: Exporta eventos em PDF
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: PDF gerado com sucesso
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Erro ao gerar o PDF
 */
router.get("/events/export/pdf", exportEventsPDF);

module.exports = router;