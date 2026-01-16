const { sql } = require('../db');

const getAllServices = async () => {
    const result = await new sql.Request().query('SELECT * FROM Services');
    return result.recordset;
};

const addService = async ({ service_name, description, price }) => {
    const request = new sql.Request();
    request.input('service_name', sql.NVarChar, service_name);
    request.input('description', sql.NVarChar, description);
    request.input('price', sql.Int, price);

    await request.query(`
        INSERT INTO Services (service_name, description, price)
        VALUES (@service_name, @description, @price)
    `);
};

module.exports = { getAllServices, addService };
