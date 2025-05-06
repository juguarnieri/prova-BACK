const participantModel = require("../models/participantModel");

const getAllParticipants = async (req, res) => {
    try {
        const { enterprise } = req.query;
        const participants = await participantModel.getParticipants(enterprise); 
        if (!participants || participants.length === 0) {
            return res.status(404).json({ message: "Nenhum participante encontrado." });
        }
        res.status(200).json({
            message: "Lista de participantes recuperada com sucesso.",
            data: participants,
        });
    } catch (error) {
        console.error("Erro ao buscar participantes:", error.message);
        res.status(500).json({
            message: "Erro ao buscar participantes.",
            error: error.message, 
        });
    }
};

const getParticipantById = async (req, res) => {
    try {
        const participant = await participantModel.getParticipantById(req.params.id);
        if (!participant) {
            return res.status(404).json({ message: "Participante não encontrado." });
        }
        res.status(200).json({
            message: "Participante encontrado com sucesso.",
            data: participant,
        });
    } catch (error) {
        console.error("Erro ao buscar participante:", error);
        res.status(500).json({ message: "Erro ao buscar participante." });
    }
};
const createParticipant = async (req, res) => {
    try {
        const { name, enterprise, email, skills } = req.body;
        const photo = req.file ? req.file.filename : req.body.photo;

        if (!name || !enterprise || !email || !skills || !photo) {
            return res.status(400).json({ message: "Os campos 'name', 'enterprise', 'email', 'skills' e 'photo' são obrigatórios." });
        }

        const newParticipant = await participantModel.createParticipant(name, enterprise, email, skilss, photo);
        res.status(201).json(newParticipant);
    } catch (error) {
        console.error("Erro ao criar participante:", error);
        res.status(500).json({ message: "Erro ao criar participante." });
    }
};

const updateParticipant = async (req, res) => {
    try {
        const { name, enterprise, email, skills } = req.body;
        const photo = req.file ? req.file.filename : req.body.photo;

        if (!name || !enterprise || !email || !skills || !photo) {
            return res.status(400).json({ message: "Os campos 'name', 'enterprise', 'email', 'skills' e 'photo' são obrigatórios." });
        }

        const updateParticipant = await participantModel.updateParticipant(req.params.id, name, enterprise, email, skills, photo);
        if (!updateParticipant) {
            return res.status(404).json({ message: "Participante não encontrado." });
        }

        res.status(200).json({
            message: "Participante atualizado com sucesso.",
            data: updateParticipant,
        });
    } catch (error) {
        console.error("Erro ao atualizar participante:", error);
        res.status(500).json({ message: "Erro ao atualizar participante." });
    }
};

const deleteParticipant = async (req, res) => {
    try {
        const result = await participantModel.deleteParticipant(req.params.id);

        if (!result) {
            return res.status(404).json({ message: "Participante não encontrado." });
        }

        res.status(200).json({ message: "Participante deletado com sucesso." });
    } catch (error) {
        console.error("Erro ao deletar participante:", error);
        res.status(500).json({ message: "Erro ao deletar participante." });
    }
};

module.exports = {
    getAllParticipants,
    getParticipantById,
    createParticipant,
    updateParticipant,
    deleteParticipant,
};