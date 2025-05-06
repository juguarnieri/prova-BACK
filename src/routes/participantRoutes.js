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
 *           example: TechCorp
 *         required: false
 *         description: Empresa do participante para filtrar (opcional)
 *     responses:
 *       200:
 *         description: Lista de participantes recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lista de participantes encontrada com sucesso."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Alice Martins"
 *                       email:
 *                         type: string
 *                         example: "alice.martins@email.com"
 *                       enterprise:
 *                         type: string
 *                         example: "TechCorp"
 *                       photo:
 *                         type: string
 *                         example: "alice_photo.jpg"
 *                       event_name:
 *                         type: string
 *                         example: "Tech Congress"
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
 *                 message:
 *                   type: string
 *                   example: "Participante encontrado com sucesso."
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Alice Martins"
 *                     email:
 *                       type: string
 *                       example: "alice.martins@email.com"
 *                     enterprise:
 *                       type: string
 *                       example: "TechCorp"
 *                     photo:
 *                       type: string
 *                       example: "alice_photo.jpg"
 *                     event_name:
 *                       type: string
 *                       example: "Tech Congress"
 *       404:
 *         description: Participante não encontrado
 *       500:
 *         description: Erro ao buscar participante
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
 *               - email
 *               - enterprise
 *               - event_id
 *               - photo
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Bruno Souza"
 *               email:
 *                 type: string
 *                 example: "bruno.souza@email.com"
 *               enterprise:
 *                 type: string
 *                 example: "TechCorp"
 *               event_id:
 *                 type: integer
 *                 example: 1
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Participante criado com sucesso
 *       400:
 *         description: Campos obrigatórios ausentes
 *       500:
 *         description: Erro ao criar participante
 */
router.post("/participants", upload.single("photo"), participantController.createParticipant);

/**
 * @swagger
 * /api/participants/event/{eventId}:
 *   get:
 *     summary: Busca participantes de um evento específico
 *     tags: [Participants]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do evento
 *     responses:
 *       200:
 *         description: Lista de participantes recuperada com sucesso
 *       404:
 *         description: Nenhum participante encontrado
 *       500:
 *         description: Erro ao buscar participantes
 */
router.get("/participants/event/:eventId", participantController.getParticipantsByEvent);

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
 *           example: 5
 *         description: ID do participante
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - enterprise
 *               - event_id
 *               - photo
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Carla Dias"
 *               email:
 *                 type: string
 *                 example: "carla.dias@email.com"
 *               enterprise:
 *                 type: string
 *                 example: "TechCorp"
 *               event_id:
 *                 type: integer
 *                 example: 2
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Participante atualizado com sucesso
 *       400:
 *         description: Campos obrigatórios ausentes
 *       500:
 *         description: Erro ao atualizar participante
 */
router.put("/participants/:id", upload.single("photo"), participantController.updateParticipant);

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
 *           example: 3
 *         description: ID do participante
 *     responses:
 *       200:
 *         description: Participante deletado com sucesso
 *       404:
 *         description: Participante não encontrado
 *       500:
 *         description: Erro ao deletar participante
 */
router.delete("/participants/:id", participantController.deleteParticipant);

module.exports = router;