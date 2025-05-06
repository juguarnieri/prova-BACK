const express = require("express");
const router = express.Router();
const upload = require("../config/upload");
const participantController = require("../controllers/participantController");
const apiKeyMiddleware = require("../config/apiKey");

router.use(apiKeyMiddleware);

/**
 * @swagger
 * tags:
 *   name: Participants
 *   description: Gerenciamento de participantes
 */

/**
 * @swagger
 * /api/participants:
 *   get:
 *     summary: Lista todos os participantes ou filtra por empresa
 *     tags: [Participants]
 *     parameters:
 *       - in: query
 *         name: enterprise
 *         schema:
 *           type: string
 *           example: "Empresa A"
 *         description: Nome da empresa para filtrar os participantes (opcional)
 *     responses:
 *       200:
 *         description: Lista de participantes recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "João Silva"
 *                   enterprise:
 *                     type: string
 *                     example: "Empresa A"
 *                   email:
 *                     type: string
 *                     example: "joao.silva@empresa.com"
 *                   skills:
 *                     type: string
 *                     example: "Python, SQL"
 *                   photo:
 *                     type: string
 *                     example: "joao.jpg"
 *       500:
 *         description: Erro ao buscar participantes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao buscar participantes."
 */
router.get("/participants", participantController.getAllParticipants);

/**
 * @swagger
 * /api/participants/{id}:
 *   get:
 *     summary: Busca um participante pelo ID
 *     tags: [Participants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID do participante
 *     responses:
 *       200:
 *         description: Participante encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "João Silva"
 *                 enterprise:
 *                   type: string
 *                   example: "Empresa A"
 *                 email:
 *                   type: string
 *                   example: "joao.silva@empresa.com"
 *                 skills:
 *                   type: string
 *                   example: "Python, SQL"
 *                 photo:
 *                   type: string
 *                   example: "joao.jpg"
 *       404:
 *         description: Participante não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Participante não encontrado."
 *       500:
 *         description: Erro ao buscar participante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao buscar participante."
 */
router.get("/participants/:id", participantController.getParticipantById);

/**
 * @swagger
 * /api/participants:
 *   post:
 *     summary: Cria um novo participante
 *     tags: [Participants]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - enterprise
 *               - email
 *               - skills
 *               - photo
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João Silva"
 *               enterprise:
 *                 type: string
 *                 example: "Empresa A"
 *               email:
 *                 type: string
 *                 example: "joao.silva@empresa.com"
 *               skills:
 *                 type: string
 *                 example: "Python, SQL"
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo de imagem do participante
 *     responses:
 *       201:
 *         description: Participante criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "João Silva"
 *                 enterprise:
 *                   type: string
 *                   example: "Empresa A"
 *                 email:
 *                   type: string
 *                   example: "joao.silva@empresa.com"
 *                 skills:
 *                   type: string
 *                   example: "Python, SQL"
 *                 photo:
 *                   type: string
 *                   example: "joao.jpg"
 *       400:
 *         description: Campos obrigatórios ausentes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Os campos obrigatórios estão ausentes."
 *       500:
 *         description: Erro ao criar participante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao criar participante."
 */
router.post("/participants", upload.single("photo"), participantController.createParticipant);

/**
 * @swagger
 * /api/participants/{id}:
 *   put:
 *     summary: Atualiza um participante existente
 *     tags: [Participants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID do participante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João Silva"
 *               enterprise:
 *                 type: string
 *                 example: "Empresa A"
 *               email:
 *                 type: string
 *                 example: "joao.silva@empresa.com"
 *               skills:
 *                 type: string
 *                 example: "Python, SQL"
 *               photo:
 *                 type: string
 *                 example: "joao.jpg"
 *     responses:
 *       200:
 *         description: Participante atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "João Silva"
 *                 enterprise:
 *                   type: string
 *                   example: "Empresa A"
 *                 email:
 *                   type: string
 *                   example: "joao.silva@empresa.com"
 *                 skills:
 *                   type: string
 *                   example: "Python, SQL"
 *                 photo:
 *                   type: string
 *                   example: "joao.jpg"
 *       404:
 *         description: Participante não encontrado para atualização
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Participante não encontrado para atualização."
 *       500:
 *         description: Erro ao atualizar participante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao atualizar participante."
 */
router.put("/participants/:id", participantController.updateParticipant);

/**
 * @swagger
 * /api/participants/{id}:
 *   delete:
 *     summary: Deleta um participante
 *     tags: [Participants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID do participante
 *     responses:
 *       200:
 *         description: Participante deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Participante deletado com sucesso."
 *       404:
 *         description: Participante não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Participante não encontrado."
 *       500:
 *         description: Erro ao deletar participante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao deletar participante."
 */
router.delete("/participants/:id", participantController.deleteParticipant);

module.exports = router;