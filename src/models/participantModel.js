const pool = require("../config/database");

const getAllParticipants = async (enterprise) => {
    if (enterprise) {
        const query = "SELECT * FROM participants WHERE enterprise = $1";
        const values = [enterprise];
        const result = await pool.query(query, values);
        return result.rows;
    } else {
        const query = "SELECT * FROM participants";
        const result = await pool.query(query);
        return result.rows;
    }
};

const getParticipantById = async (id) => {
    console.log("ID recebido para busca:", id); 

    const query = `
        SELECT participants.*, events.name AS event_name 
        FROM participants 
        LEFT JOIN events ON participants.event_id = events.id 
        WHERE participants.id = $1
    `;
    const result = await pool.query(query, [id]);

    console.log("Resultado da consulta:", result.rows); 

    if (result.rowCount === 0) {
        throw new Error("Participante não encontrado.");
    }

    return result.rows[0];
};

const createParticipant = async ({ name, email, enterprise, event_id, photo }) => {
    const query = `
        INSERT INTO participants (name, email, enterprise, event_id, photo)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const values = [name, email, enterprise, event_id, photo];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const updateParticipant = async (id, { name, email, enterprise, event_id, photo }) => {
    const query = `
        UPDATE participants
        SET 
            name = $1,
            email = $2,
            enterprise = $3,
            event_id = $4,
            photo = $5
        WHERE id = $6
        RETURNING *;
    `;
    const values = [name, email, enterprise, event_id, photo, id];
    const result = await pool.query(query, values); 
    return result.rows[0];
};
const deleteParticipant = async (id) => {
    const result = await pool.query(
        "DELETE FROM participants WHERE id = $1 RETURNING *",
        [id]
    );

    if (result.rowCount === 0) {
        throw new Error("Participante não encontrado para exclusão.");
    }

    return { message: "Participante deletado com sucesso." };
};

const getParticipantsByEvent = async (eventId) => {
    const result = await pool.query(
        `SELECT * FROM participants WHERE event_id = $1`,
        [eventId]
    );
    return result.rows;
};

const getParticipantsWithEvent = async () => {
    try {
        const query = `
            SELECT 
                p.id, 
                p.name, 
                p.email, 
                p.enterprise, 
                e.name AS event_name
            FROM participants p
            LEFT JOIN events e ON p.event_id = e.id
        `;
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error("Erro ao buscar participantes com eventos:", error);
        throw error;
    }
};

module.exports = { 
    getAllParticipants,
    getParticipantById,
    createParticipant,
    updateParticipant,
    getParticipantsWithEvent,
    deleteParticipant,
    getParticipantsByEvent
};