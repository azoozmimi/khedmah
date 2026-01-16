const { sql } = require('../db');

const getAllLicenses = async () => {
    const result = await new sql.Request().query('SELECT * FROM DriverLicenses');
    return result.recordset;
};

const addLicense = async ({ user_id, license_number, category, issue_date, expiry_date }) => {
    const request = new sql.Request();
    request.input('user_id', sql.Int, user_id);
    request.input('license_number', sql.NVarChar, license_number);
    request.input('category', sql.NVarChar, category);
    request.input('issue_date', sql.DateTime, issue_date);
    request.input('expiry_date', sql.DateTime, expiry_date);

    await request.query(`
        INSERT INTO DriverLicenses (user_id, license_number, category, issue_date, expiry_date)
        VALUES (@user_id, @license_number, @category, @issue_date, @expiry_date)
    `);
};

module.exports = { getAllLicenses, addLicense };
