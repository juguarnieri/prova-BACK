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
 *     summary: Exporta a lista de participantes em formato PDF
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: PDF gerado com sucesso
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Nenhum participante encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Nenhum participante encontrado."
 *       500:
 *         description: Erro ao gerar o PDF
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao gerar o PDF de participantes."
 */
router.get("/participants/export/pdf", exportParticipantsPDF);

/**
 * @swagger
 * /api/reports/events/export/pdf:
 *   get:
 *     summary: Exporta a lista de eventos em formato PDF
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: PDF gerado com sucesso
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Nenhum evento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Nenhum evento encontrado."
 *       500:
 *         description: Erro ao gerar o PDF
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao gerar o PDF de eventos."
 */
router.get("/events/export/pdf", exportEventsPDF);

module.exports = router;