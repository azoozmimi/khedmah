const { sql } = require('../db');

const getAllVehicles = async () => {
    const result = await new sql.Request().query('SELECT * FROM Vehicles');
    return result.recordset;
};

const addVehicle = async ({ user_id, plate_number, model, manufacturer, year, color }) => {
    const request = new sql.Request();
    request.input('user_id', sql.Int, user_id);
    request.input('plate_number', sql.NVarChar, plate_number);
    request.input('model', sql.NVarChar, model);
    request.input('manufacturer', sql.NVarChar, manufacturer);
    request.input('year', sql.Int, year);
    request.input('color', sql.NVarChar, color);

    await request.query(`
        INSERT INTO Vehicles (user_id, plate_number, model, manufacturer, year, color)
        VALUES (@user_id, @plate_number, @model, @manufacturer, @year, @color)
    `);
};

module.exports = { getAllVehicles, addVehicle };
