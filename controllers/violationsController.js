const { sql } = require('../db');

const getAllViolations = async () => {
    const result = await new sql.Request().query('SELECT * FROM Violations');
    return result.recordset;
};

const addViolation = async ({ fine_id, violation_date, points }) => {
    const request = new sql.Request();
    request.input('fine_id', sql.Int, fine_id);
    request.input('violation_date', sql.DateTime, violation_date);
    request.input('points', sql.Int, points);

    await request.query(`
        INSERT INTO Violations (fine_id, violation_date, points)
        VALUES (@fine_id, @violation_date, @points)
    `);
};

module.exports = { getAllViolations, addViolation };
