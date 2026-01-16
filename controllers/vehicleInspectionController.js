const { sql } = require('../db');

const getAllInspections = async () => {
    const result = await new sql.Request().query('SELECT * FROM VehicleInspection');
    return result.recordset;
};

const addInspection = async ({ vehicle_id, inspection_date, result }) => {
    const request = new sql.Request();
    request.input('vehicle_id', sql.Int, vehicle_id);
    request.input('inspection_date', sql.DateTime, inspection_date);
    request.input('result', sql.NVarChar, result);

    await request.query(`
        INSERT INTO VehicleInspection (vehicle_id, inspection_date, result)
        VALUES (@vehicle_id, @inspection_date, @result)
    `);
};

module.exports = { getAllInspections, addInspection };
