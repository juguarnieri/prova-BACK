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
 *         description: Erro interno ao buscar participantes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ocorreu um erro inesperado ao buscar os participantes. Por favor, tente novamente mais tarde."
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Nenhum participante foi encontrado com o ID fornecido."
 *       500:
 *         description: Erro interno ao buscar participante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ocorreu um erro inesperado ao buscar o participante. Por favor, tente novamente mais tarde."
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
 *         description: Dados inválidos ou campos obrigatórios ausentes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Os campos obrigatórios 'name', 'email', 'enterprise', 'event_id' e 'photo' devem ser preenchidos."
 *       500:
 *         description: Erro interno ao criar participante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ocorreu um erro inesperado ao criar o participante. Por favor, tente novamente mais tarde."
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
 *           example: 1
 *         description: ID do evento para buscar os participantes
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
 *                   example: "Lista de participantes recuperada com sucesso."
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
 *       404:
 *         description: Nenhum participante encontrado para o evento especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Nenhum participante foi encontrado para o evento com ID fornecido."
 *       500:
 *         description: Erro interno ao buscar participantes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ocorreu um erro inesperado ao buscar os participantes. Por favor, tente novamente mais tarde."
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
 *         description: ID do participante a ser atualizado
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Participante atualizado com sucesso."
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 5
 *                     name:
 *                       type: string
 *                       example: "Carla Dias"
 *                     email:
 *                       type: string
 *                       example: "carla.dias@email.com"
 *                     enterprise:
 *                       type: string
 *                       example: "TechCorp"
 *                     event_id:
 *                       type: integer
 *                       example: 2
 *       400:
 *         description: Dados inválidos ou campos obrigatórios ausentes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Os campos obrigatórios 'name', 'email', 'enterprise', 'event_id' e 'photo' devem ser preenchidos."
 *       500:
 *         description: Erro interno ao atualizar participante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ocorreu um erro inesperado ao atualizar o participante. Por favor, tente novamente mais tarde."
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
 *         description: ID do participante a ser deletado
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
 *                   example: "Nenhum participante foi encontrado com o ID fornecido."
 *       500:
 *         description: Erro interno ao deletar participante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ocorreu um erro inesperado ao deletar o participante. Por favor, tente novamente mais tarde."
 */
router.delete("/participants/:id", participantController.deleteParticipant);

module.exports = router;