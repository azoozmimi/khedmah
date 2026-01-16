const { sql } = require('../db');

const getAllAppointments = async () => {
    const result = await new sql.Request().query('SELECT * FROM Appointments');
    return result.recordset;
};

const addAppointment = async ({ user_id, service_id, date, status }) => {
    const request = new sql.Request();
    request.input('user_id', sql.Int, user_id);
    request.input('service_id', sql.Int, service_id);
    request.input('date', sql.DateTime, date);
    request.input('status', sql.NVarChar, status);

    await request.query(`
        INSERT INTO Appointments (user_id, service_id, date, status)
        VALUES (@user_id, @service_id, @date, @status)
    `);
};

module.exports = { getAllAppointments, addAppointment };
