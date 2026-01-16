const { sql } = require('../db');

const getAllWallets = async () => {
    const result = await new sql.Request().query('SELECT * FROM UserWallet');
    return result.recordset;
};

const addWallet = async ({ user_id, balance }) => {
    const request = new sql.Request();
    request.input('user_id', sql.Int, user_id);
    request.input('balance', sql.Int, balance);

    await request.query(`
        INSERT INTO UserWallet (user_id, balance)
        VALUES (@user_id, @balance)
    `);
};

module.exports = { getAllWallets, addWallet };
