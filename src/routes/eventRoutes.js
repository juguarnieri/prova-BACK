const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const apiKeyMiddleware = require("../config/apiKey");

router.use(apiKeyMiddleware);

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Gerenciamento de eventos
 */

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Lista todos os eventos
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Lista de eventos recuperada com sucesso
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
 *                     example: "Tech Congress"
 *                   description:
 *                     type: string
 *                     example: "Annual event on technology innovations."
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: "2025-06-15"
 *                   location:
 *                     type: string
 *                     example: "SP Convention Center"
 *       500:
 *         description: Erro interno ao buscar eventos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ocorreu um erro inesperado ao buscar os eventos. Por favor, tente novamente mais tarde."
 */
router.get("/events", eventController.getAllEvents);

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Busca um evento pelo ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID do evento
 *     responses:
 *       200:
 *         description: Evento encontrado com sucesso
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
 *                   example: "Tech Congress"
 *                 description:
 *                   type: string
 *                   example: "Annual event on technology innovations."
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: "2025-06-15"
 *                 location:
 *                   type: string
 *                   example: "SP Convention Center"
 *       404:
 *         description: Evento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Nenhum evento foi encontrado com o ID fornecido."
 *       500:
 *         description: Erro interno ao buscar evento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ocorreu um erro inesperado ao buscar o evento. Por favor, tente novamente mais tarde."
 */
router.get("/events/:id", eventController.getEventById);

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Cria um novo evento
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - date
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Tech Congress"
 *               description:
 *                 type: string
 *                 example: "Annual event on technology innovations."
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-15"
 *               location:
 *                 type: string
 *                 example: "SP Convention Center"
 *     responses:
 *       201:
 *         description: Evento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Evento criado com sucesso."
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Tech Congress"
 *                     description:
 *                       type: string
 *                       example: "Annual event on technology innovations."
 *                     date:
 *                       type: string
 *                       format: date
 *                       example: "2025-06-15"
 *                     location:
 *                       type: string
 *                       example: "SP Convention Center"
 *       400:
 *         description: Campos obrigatórios ausentes ou inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Os campos obrigatórios 'name', 'date' e 'location' devem ser preenchidos corretamente."
 *       500:
 *         description: Erro interno ao criar evento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ocorreu um erro inesperado ao criar o evento. Por favor, tente novamente mais tarde."
 */
router.post("/events", eventController.createEvent);

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Atualiza um evento existente
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID do evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Tech Congress Updated"
 *               description:
 *                 type: string
 *                 example: "Updated description."
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-20"
 *               location:
 *                 type: string
 *                 example: "Updated Location"
 *     responses:
 *       200:
 *         description: Evento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Evento atualizado com sucesso."
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Tech Congress Updated"
 *                     description:
 *                       type: string
 *                       example: "Updated description."
 *                     date:
 *                       type: string
 *                       format: date
 *                       example: "2025-06-20"
 *                     location:
 *                       type: string
 *                       example: "Updated Location"
 *       404:
 *         description: Evento não encontrado para atualização
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Nenhum evento foi encontrado com o ID fornecido para atualização."
 *       500:
 *         description: Erro interno ao atualizar evento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ocorreu um erro inesperado ao atualizar o evento. Por favor, tente novamente mais tarde."
 */
router.put("/events/:id", eventController.updateEvent);

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Deleta um evento
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID do evento
 *     responses:
 *       200:
 *         description: Evento deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Evento deletado com sucesso."
 *       404:
 *         description: Evento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Nenhum evento foi encontrado com o ID fornecido."
 *       500:
 *         description: Erro interno ao deletar evento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ocorreu um erro inesperado ao deletar o evento. Por favor, tente novamente mais tarde."
 */
router.delete("/events/:id", eventController.deleteEvent);

module.exports = router;