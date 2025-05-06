const pool = require("../config/database");

const getEvents = async () => {
    try {
        const query = "SELECT * FROM events";
        const result = await pool.query(query);
        return result.rows; 
    } catch (error) {
        console.error("Erro ao buscar eventos:", error);
        throw error;
    }
};

const createEvent = async ({ name, description, date, location }) => {
    const query = `
        INSERT INTO events (name, description, date, location)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    const values = [name, description, date, location];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const getEventById = async (id) => {
    try {
        const result = await pool.query("SELECT * FROM events WHERE id = $1", [id]);
        return result.rowCount > 0 ? result.rows[0] : null;
    } catch (error) {
        console.error("Erro no getEventById:", error);
        throw error;
    }
};

const updateEvent = async (id, name, description, date, location) => {
    try {
        const result = await pool.query(
            `UPDATE events
             SET name = $1, description = $2, date = $3, location = $4
             WHERE id = $5
             RETURNING *;`,
            [name, description, date, location, id]
        );
        return result.rowCount > 0 ? result.rows[0] : null;
    } catch (error) {
        console.error("Erro no updateEvent:", error);
        throw error;
    }
};

const deleteEvent = async (id) => {
    try {
        const result = await pool.query("DELETE FROM events WHERE id = $1 RETURNING *", [id]);
        return result.rowCount > 0 ? result.rows[0] : null;
    } catch (error) {
        console.error("Erro no deleteEvent:", error);
        throw error;
    }
};

const getEventsWithParticipantsCount = async () => {
    try {
        const result = await pool.query(`
            SELECT 
                e.id, 
                e.name, 
                e.date, 
                e.location, 
                COUNT(p.id) AS participants_count
            FROM events e
            LEFT JOIN participants p ON e.id = p.event_id
            GROUP BY e.id
            ORDER BY e.date ASC
        `);
        return result.rows;
    } catch (error) {
        console.error("Erro ao buscar eventos com contagem de participantes:", error);
        throw error;
    }
};

module.exports = {
    createEvent,
    getEventById,
    updateEvent,
    getEvents,
    deleteEvent,
    getEventsWithParticipantsCount,
};