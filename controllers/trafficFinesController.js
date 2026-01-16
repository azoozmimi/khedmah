const { sql } = require('../db');

const getAllFines = async () => {
    const result = await new sql.Request().query('SELECT * FROM TrafficFines');
    return result.recordset;
};

const addFine = async ({ user_id, vehicle_id, amount, reason, status }) => {
    const request = new sql.Request();
    request.input('user_id', sql.Int, user_id);
    request.input('vehicle_id', sql.Int, vehicle_id);
    request.input('amount', sql.Int, amount);
    request.input('reason', sql.NVarChar, reason);
    request.input('status', sql.NVarChar, status);

    await request.query(`
        INSERT INTO TrafficFines (user_id, vehicle_id, amount, reason, status)
        VALUES (@user_id, @vehicle_id, @amount, @reason, @status)
    `);
};

module.exports = { getAllFines, addFine };
