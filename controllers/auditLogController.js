const { sql } = require('../db');

const getAllLogs = async () => {
    const result = await new sql.Request().query('SELECT * FROM AuditLog');
    return result.recordset;
};

const addLog = async ({ user_id, action, timestamp }) => {
    const request = new sql.Request();
    request.input('user_id', sql.Int, user_id);
    request.input('action', sql.NVarChar, action);
    request.input('timestamp', sql.DateTime, timestamp);

    await request.query(`
        INSERT INTO AuditLog (user_id, action, timestamp)
        VALUES (@user_id, @action, @timestamp)
    `);
};

module.exports = { getAllLogs, addLog };
