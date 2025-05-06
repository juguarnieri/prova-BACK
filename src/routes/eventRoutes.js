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
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lista de eventos encontrada com sucesso."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name_event:
 *                         type: string
 *                         example: "Tech Congress"
 *                       date:
 *                         type: string
 *                         example: "2025-05-15"
 *                       location:
 *                         type: string
 *                         example: "São Paulo"
 *                       description:
 *                         type: string
 *                         example: "Evento sobre novas tecnologias."
 *                       participant_id:
 *                         type: integer
 *                         example: 1
 *       500:
 *         description: Erro ao buscar eventos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao buscar eventos."
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
 *                 message:
 *                   type: string
 *                   example: "Evento encontrado com sucesso."
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name_event:
 *                       type: string
 *                       example: "Tech Congress"
 *                     date:
 *                       type: string
 *                       example: "2025-05-15"
 *                     location:
 *                       type: string
 *                       example: "São Paulo"
 *                     description:
 *                       type: string
 *                       example: "Evento sobre novas tecnologias."
 *                     participant_id:
 *                       type: integer
 *                       example: 1
 *       404:
 *         description: Evento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Evento não encontrado."
 *       500:
 *         description: Erro ao buscar evento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao buscar evento."
 */
router.get("/events/:id", eventController.getEventsById);

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
 *               - name_event
 *               - date
 *               - location
 *               - description
 *               - participant_id
 *             properties:
 *               name_event:
 *                 type: string
 *                 example: "Tech Congress"
 *               date:
 *                 type: string
 *                 example: "2025-05-15"
 *               location:
 *                 type: string
 *                 example: "São Paulo"
 *               description:
 *                 type: string
 *                 example: "Evento sobre novas tecnologias."
 *               participant_id:
 *                 type: integer
 *                 example: 1
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
 *                       example: 10
 *                     name_event:
 *                       type: string
 *                       example: "Tech Congress"
 *                     date:
 *                       type: string
 *                       example: "2025-05-15"
 *                     location:
 *                       type: string
 *                       example: "São Paulo"
 *                     description:
 *                       type: string
 *                       example: "Evento sobre novas tecnologias."
 *                     participant_id:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Campos obrigatórios ausentes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Todos os campos são obrigatórios."
 *       500:
 *         description: Erro ao criar evento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao criar evento."
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
 *           example: 5
 *         description: ID do evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name_event
 *               - date
 *               - location
 *               - description
 *               - participant_id
 *             properties:
 *               name_event:
 *                 type: string
 *                 example: "Tech Congress"
 *               date:
 *                 type: string
 *                 example: "2025-05-15"
 *               location:
 *                 type: string
 *                 example: "São Paulo"
 *               description:
 *                 type: string
 *                 example: "Evento sobre novas tecnologias."
 *               participant_id:
 *                 type: integer
 *                 example: 1
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
 *                       example: 5
 *                     name_event:
 *                       type: string
 *                       example: "Tech Congress"
 *                     date:
 *                       type: string
 *                       example: "2025-05-15"
 *                     location:
 *                       type: string
 *                       example: "São Paulo"
 *                     description:
 *                       type: string
 *                       example: "Evento sobre novas tecnologias."
 *                     participant_id:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Campos obrigatórios ausentes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Todos os campos são obrigatórios."
 *       500:
 *         description: Erro ao atualizar evento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao atualizar evento."
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
 *           example: 3
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
 *                   example: "Evento não encontrado."
 *       500:
 *         description: Erro ao deletar evento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao deletar evento."
 */
router.delete("/events/:id", eventController.deleteEvent);

module.exports = router;