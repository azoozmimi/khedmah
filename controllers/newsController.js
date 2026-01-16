const { sql } = require('../db');

const getAllNews = async () => {
    const result = await new sql.Request().query('SELECT * FROM News');
    return result.recordset;
};

const addNews = async ({ title, content }) => {
    const request = new sql.Request();
    request.input('title', sql.NVarChar, title);
    request.input('content', sql.NVarChar, content);

    await request.query(`
        INSERT INTO News (title, content)
        VALUES (@title, @content)
    `);
};

module.exports = { getAllNews, addNews };
