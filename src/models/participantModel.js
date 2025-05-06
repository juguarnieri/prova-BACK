const pool = require("../config/database");

const getParticipants = async (date = null) => {
    try {
        let query = "SELECT * FROM participants";
        const params = [];

        if (date) {
            query += " WHERE enterprise = $1";
            params.push(date);
        }

        const result = await pool.query(query, params);
        return result.rows; 
    } catch (error) {
        console.error("Erro ao buscar participantes:", error);
        throw error;
    }
};

const createParticipant = async (name, enterprise, email, skills, photo) => {
    try {
        const query = `
            INSERT INTO participants (name, enterprise, email, skills, photo)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const values = [name, enterprise, email, skills, photo];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Erro ao criar participante:", error);
        throw error;
    }
};

const getParticipantById = async (id) => {
    try {
        const result = await pool.query("SELECT * FROM participants WHERE id = $1", [id]);
        return result.rowCount > 0 ? result.rows[0] : null;
    } catch (error) {
        console.error("Erro no getParticipantById:", error);
        throw error;
    }
};

const updateParticipant = async (id, name, enterprise, email, skills, photo) => {
    try {
        const query = `
            UPDATE participants
            SET name = $1, enterprise = $2, email = $3, skills = $4, photo = $5
            WHERE id = $6
            RETURNING *
        `;
        const values = [name, enterprise, email, skills, photo, id];
        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return null; 
        }

        return result.rows[0]; 
    } catch (error) {
        console.error("Erro ao atualizar participante:", error);
        throw error;
    }
};

const deleteParticipant = async (id) => {
    try {
        const result = await pool.query("DELETE FROM participants WHERE id = $1 RETURNING *", [id]);
        return result.rowCount > 0 ? result.rows[0] : null;
    } catch (error) {
        console.error("Erro no deleteParticipant:", error);
        throw error;
    }
};

const getParticipantsWithEvent = async () => {
    try {
        const query = `
            SELECT 
                p.id AS participant_id,
                p.name AS participant_name,
                p.enterprise,
                p.email,
                p.skills,
                p.photo,
                e.name_event AS event_name
            FROM participants p
            LEFT JOIN events e ON e.participant_id = p.id
        `;
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error("Erro ao buscar participantes com eventos:", error);
        throw error;
    }
};
module.exports = {
    createParticipant,
    getParticipantById,
    updateParticipant,
    getParticipants,
    deleteParticipant,
    getParticipantsWithEvent
};