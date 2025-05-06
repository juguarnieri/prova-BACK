const pool = require("../config/database");

const getParticipants = async (date = null) => {
    try {
        let query = "SELECT * FROM participants";
        const params = [];

        if (date) {
            query += " WHERE date = $1";
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
        const result = await pool.query(
            "INSERT INTO participants (name, enterprise, email, skills, photo) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [name, enterprise, email, skills, photo]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Erro no createParticipant:", error);
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

const updateParticipants = async (id, name, enterprise, email, skills, photo) => {
    try {
        const result = await pool.query(
            `UPDATE participants
             SET name = $1, enterprise = $2, email = $3, skills = $4, photo = $5
            WHERE id = $6 RETURNING *`,
            [name, enterprise, email, skills, photo, id]
        );
        return result.rowCount > 0 ? result.rows[0] : null;
    } catch (error) {
        console.error("Erro no updateParticipants:", error);
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
getParticipantsWithEvent = async () => {
    try {
        const query = `
            SELECT p.*, e.name_event
            FROM participants p
            LEFT JOIN events e ON p.event_id = e.id
        `;
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error("Erro ao buscar participantes com eventos:", error);
        throw error;
    }
}
module.exports = {
    createParticipant,
    getParticipantById,
    updateParticipants,
    getParticipants,
    deleteParticipant,
    getParticipantsWithEvent
};