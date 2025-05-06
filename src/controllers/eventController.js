const eventModel = require("../models/eventModel");

const getAllEvents = async (req, res) => {
    try {
        const events = await eventModel.getEvents(); 
        if (!events || events.length === 0) {
            return res.status(404).json({ message: "Nenhum evento encontrado." });
        }
        res.status(200).json({
            message: "Lista de eventos recuperada com sucesso.",
            data: events,
        });
    } catch (error) {
        console.error("Erro ao buscar eventos:", error.message);
        res.status(500).json({
            message: "Erro ao buscar eventos.",
            error: error.message, 
        });
    }
};

const getEventById = async (req, res) => {
    try {
        const event = await eventModel.getEventById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Evento não encontrado." });
        }
        res.status(200).json({
            message: "Evento encontrado com sucesso.",
            data: event,
        });
    } catch (error) {
        console.error("Erro ao buscar evento:", error);
        res.status(500).json({ message: "Erro ao buscar evento." });
    }
};

const createEvent = async (req, res) => {
    try {
        const { name, description, date, location } = req.body;

        // Validações
        if (!name || !date || !location) {
            return res.status(400).json({ message: "Os campos 'name', 'date' e 'location' são obrigatórios." });
        }

        const newEvent = await eventModel.createEvent({ name, description, date, location });
        res.status(201).json({
            message: "Evento criado com sucesso.",
            data: newEvent,
        });
    } catch (error) {
        console.error("Erro ao criar evento:", error.message);
        res.status(500).json({ message: "Erro ao criar evento." });
    }
};

const updateEvent = async (req, res) => {
    try {
        const { name, description, date, location } = req.body;

        if (!name || !description || !date || !location) {
            return res.status(400).json({ message: "Os campos 'name', 'description', 'date' e 'location' são obrigatórios." });
        }

        const updatedEvent = await eventModel.updateEvent(req.params.id, name, description, date, location);
        if (!updatedEvent) {
            return res.status(404).json({ message: "Evento não encontrado." });
        }

        res.status(200).json({
            message: "Evento atualizado com sucesso.",
            data: updatedEvent,
        });
    } catch (error) {
        console.error("Erro ao atualizar evento:", error);
        res.status(500).json({ message: "Erro ao atualizar evento." });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const result = await eventModel.deleteEvent(req.params.id);

        if (!result) {
            return res.status(404).json({ message: "Evento não encontrado." });
        }

        res.status(200).json({ message: "Evento deletado com sucesso." });
    } catch (error) {
        console.error("Erro ao deletar evento:", error);
        res.status(500).json({ message: "Erro ao deletar evento." });
    }
};

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
};