const { sql } = require('../db');

const getAllUserServices = async () => {
    const result = await new sql.Request().query('SELECT * FROM UserServices');
    return result.recordset;
};

const addUserService = async ({ user_id, service_id, status }) => {
    const request = new sql.Request();
    request.input('user_id', sql.Int, user_id);
    request.input('service_id', sql.Int, service_id);
    request.input('status', sql.NVarChar, status);

    await request.query(`
        INSERT INTO UserServices (user_id, service_id, status)
        VALUES (@user_id, @service_id, @status)
    `);
};

module.exports = { getAllUserServices, addUserService };
