const { sql } = require('../db');

const getAllInsurance = async () => {
    const result = await new sql.Request().query('SELECT * FROM Insurance');
    return result.recordset;
};

const addInsurance = async ({ vehicle_id, company, policy_number, start_date, end_date }) => {
    const request = new sql.Request();
    request.input('vehicle_id', sql.Int, vehicle_id);
    request.input('company', sql.NVarChar, company);
    request.input('policy_number', sql.NVarChar, policy_number);
    request.input('start_date', sql.DateTime, start_date);
    request.input('end_date', sql.DateTime, end_date);

    await request.query(`
        INSERT INTO Insurance (vehicle_id, company, policy_number, start_date, end_date)
        VALUES (@vehicle_id, @company, @policy_number, @start_date, @end_date)
    `);
};

module.exports = { getAllInsurance, addInsurance };
