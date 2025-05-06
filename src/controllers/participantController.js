const participantModel = require("../models/participantModel");

const getAllParticipants = async (req, res) => {
    try {
        const { enterprise } = req.query;
        const participants = await participantModel.getAllParticipants(enterprise); 
        res.status(200).json({
            message: "Lista de participantes recuperada com sucesso.",
            data: participants,
        });
    } catch (error) {
        console.error("Erro ao buscar participantes:", error.message);
        res.status(500).json({ message: "Erro ao buscar participantes." });
    }
};

const getParticipantById = async (req, res) => {
    try {
        const { id } = req.params; 
        console.log("ID recebido no controlador:", id); 

        const participant = await participantModel.getParticipantById(id);

        res.status(200).json({
            message: "Participante encontrado com sucesso.",
            data: participant,
        });
    } catch (error) {
        console.error("Erro ao buscar participante:", error.message);
        res.status(404).json({ message: "Participante não encontrado." });
    }
};

const getParticipantsByEvent = async (req, res) => {
    const { eventId } = req.params;

    try {
        const participants = await participantModel.getParticipantsByEvent(eventId);

        if (participants.length === 0) {
            return res.status(404).json({ message: "Nenhum participante encontrado para este evento." });
        }

        res.status(200).json({
            message: "Participantes recuperados com sucesso.",
            data: participants,
        });
    } catch (error) {
        console.error("Erro ao buscar participantes do evento:", error.message);
        res.status(500).json({ message: "Erro ao buscar participantes do evento." });
    }
};

const createParticipant = async (req, res) => {
    try {
        const { name, email, enterprise, event_id } = req.body;
        const photo = req.file ? req.file.filename : null; 

        if (!name || !email || !enterprise || !event_id || !photo) {
            return res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
        }

        const newParticipant = await participantModel.createParticipant({
            name,
            email,
            enterprise,
            event_id,
            photo,
        });

        res.status(201).json({
            message: "Participante criado com sucesso.",
            data: newParticipant,
        });
    } catch (error) {
        console.error("Erro ao criar participante:", error.message);
        res.status(500).json({ message: "Erro ao criar participante." });
    }
};

const updateParticipant = async (req, res) => {
    const { id } = req.params;
    const { name, email, enterprise, event_id } = req.body;
    const photo = req.file ? req.file.filename : req.body.photo;

    if (!id || !name || !email || !enterprise || !event_id || !photo) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    try {
        const updatedParticipant = await participantModel.updateParticipant(id, { name, email, enterprise, photo, event_id });
        res.status(200).json({
            message: "Participante atualizado com sucesso.",
            data: updatedParticipant,
        });
    } catch (error) {
        console.error("Erro ao atualizar participante:", error.message);
        res.status(500).json({ message: "Erro ao atualizar participante." });
    }
};

const deleteParticipant = async (req, res) => {
    try {
        const deleted = await participantModel.deleteParticipant(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Participante não encontrado para exclusão." });
        }
        res.status(200).json({ message: "Participante deletado com sucesso." });
    } catch (error) {
        console.error("Erro ao deletar participante:", error.message);
        res.status(500).json({ message: "Erro ao deletar participante." });
    }
};

module.exports = {
    getAllParticipants,
    getParticipantById,
    createParticipant,
    updateParticipant,
    deleteParticipant,
    getParticipantsByEvent,
};