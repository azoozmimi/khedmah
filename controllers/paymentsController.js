const { sql } = require('../db');

const getAllPayments = async () => {
    const result = await new sql.Request().query('SELECT * FROM Payments');
    return result.recordset;
};

const addPayment = async ({ user_id, amount, service_id, status, date }) => {
    const request = new sql.Request();
    request.input('user_id', sql.Int, user_id);
    request.input('amount', sql.Int, amount);
    request.input('service_id', sql.Int, service_id);
    request.input('status', sql.NVarChar, status);
    request.input('date', sql.DateTime, date);

    await request.query(`
        INSERT INTO Payments (user_id, amount, service_id, status, date)
        VALUES (@user_id, @amount, @service_id, @status, @date)
    `);
};

module.exports = { getAllPayments, addPayment };
