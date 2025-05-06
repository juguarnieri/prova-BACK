const { Events } = require("pg");
const eventModel = require("../models/eventModel");

const getAllEvents = async (req, res) => {
    try {
        const Events = await eventModel.getAllEvents(); 
        res.status(200).json({
            message: "Lista de eventos recuperada com sucesso.",
            data: Events,
        });
    } catch (error) {
        console.error("Erro ao buscar eventos:", error.message);
        res.status(500).json({ message: "Erro ao buscar eventos." });
    }
};

const getEventsById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await eventModel.getEventsById(id);
        if (!event) {
            return res.status(404).json({ message: "Evento não encontrado." });
        }
        res.status(200).json({
            message: "Evento encontrado com sucesso.",
            data: event,
        });
    } catch (error) {
        console.error("Erro ao buscar evento:", error.message);
        res.status(500).json({ message: "Erro ao buscar evento." });
    }
};

const getParticipantsByEvent = async (req, res) => {
    const { eventId } = req.params;

    try {
        const Events = await eventModel.getParticipantsByEvent(eventId); 

        if (Events.length === 0) {
            return res.status(404).json({ message: "Nenhum participante encontrado para este evento." });
        }

        res.status(200).json({
            message: "Eventos recuperados com sucesso.",
            data: Events,
        });
    } catch (error) {
        console.error("Erro ao buscar participantes do evento:", error.message);
        res.status(500).json({ message: "Erro ao buscar participantes do evento." });
    }
};

const createEvent = async (req, res) => {
    const { name_event, date, location, description, participant_id } = req.body;

    if (!name_event || !date || !location || !description || !participant_id) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    try {
        const newEvent = await eventModel.createEvent({ name_event, date, location, description, participant_id });
        res.status(201).json({ message: "Evento criado com sucesso.", data: newEvent });
    } catch (error) {
        console.error("Erro ao criar evento:", error.message);
        res.status(500).json({ message: "Erro ao criar evento." });
    }
};

const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { name_event, date, location, description, participant_id } = req.body;

    if (!name_event || !date || !location || !description || !participant_id) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    try {
        const updateEvent = await eventModel.updateEvent(id, { name_event, date, location, description, participant_id });
        res.status(200).json({
            message: "Evento atualizado com sucesso.",
            data: updateEvent,
        });
    } catch (error) {
        console.error("Erro ao atualizar evento:", error.message);
        res.status(500).json({ message: "Erro ao atualizar evento." });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const deleted = await eventModel.deleteEvent(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Evento não encontrado para exclusão." });
        }
        res.status(200).json({ message: "Evento deletado com sucesso." });
    } catch (error) {
        console.error("Erro ao deletar evento:", error.message);
        res.status(500).json({ message: "Erro ao deletar evento." });
    }
};

module.exports = {
    getAllEvents,
    getEventsById,
    createEvent,
    updateEvent,
    deleteEvent,
    getParticipantsByEvent
};