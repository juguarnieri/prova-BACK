const pool = require("../config/database");

const getAllEvents = async () => {
    try {
        const query = "SELECT * FROM events";
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error("Erro ao buscar eventos no banco de dados:", error);
        throw error;
    }
};

const getEventsById = async (id) => {
    try {
        const query = `
            SELECT 
                e.id, 
                e.name_event, 
                e.date, 
                e.location, 
                e.description,
                p.name AS participant_name
            FROM events e
            LEFT JOIN participants p ON e.participant_id = p.id
            WHERE e.id = $1
        `;
        const result = await pool.query(query, [id]);

        if (result.rowCount === 0) {
            throw new Error("Evento não encontrado.");
        }

        return result.rows[0];
    } catch (error) {
        console.error("Erro ao buscar evento por ID:", error);
        throw error;
    }
};

const createEvent = async ({ name_event, date, location, description, participant_id }) => {
    try {
        const query = `
            INSERT INTO events (name_event, date, location, description, participant_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const values = [name_event, date, location, description, participant_id];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Erro ao criar evento:", error);
        throw error;
    }
};

const updateEvent = async (id, { name_event, date, location, description, participant_id }) => {
    try {
        const query = `
            UPDATE events
            SET name_event = $1, date = $2, location = $3, description = $4, participant_id = $5
            WHERE id = $6
            RETURNING *;
        `;
        const values = [name_event, date, location, description, participant_id, id];
        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            throw new Error("Evento não encontrado para atualização.");
        }

        return result.rows[0];
    } catch (error) {
        console.error("Erro ao atualizar evento:", error);
        throw error;
    }
};

const deleteEvent = async (id) => {
    try {
        const query = "DELETE FROM events WHERE id = $1 RETURNING *";
        const result = await pool.query(query, [id]);

        if (result.rowCount === 0) {
            throw new Error("Evento não encontrado para exclusão.");
        }

        return { message: "Evento deletado com sucesso." };
    } catch (error) {
        console.error("Erro ao deletar evento:", error);
        throw error;
    }
};


getEventsWithParticipantsCount = async () => {
    try {
        const query = `
            SELECT 
                e.id, 
                e.name_event, 
                e.date, 
                e.location, 
                e.description,
                COUNT(p.id) AS participants_count
            FROM events e
            LEFT JOIN participants p ON e.participant_id = p.id
            GROUP BY e.id
        `;
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error("Erro ao buscar eventos com contagem de participantes:", error);
        throw error;
    }
}

module.exports = { 
    getAllEvents,
    getEventsById,
    createEvent,
    updateEvent,
    deleteEvent,
    getEventsWithParticipantsCount
};