const { sql } = require('../db');

const getAllContacts = async () => {
    const result = await new sql.Request().query('SELECT * FROM Contacts');
    return result.recordset;
};

const addContact = async ({ user_id, subject, message, status }) => {
    const request = new sql.Request();
    request.input('user_id', sql.Int, user_id);
    request.input('subject', sql.NVarChar, subject);
    request.input('message', sql.NVarChar, message);
    request.input('status', sql.NVarChar, status);

    await request.query(`
        INSERT INTO Contacts (user_id, subject, message, status)
        VALUES (@user_id, @subject, @message, @status)
    `);
};

module.exports = { getAllContacts, addContact };
