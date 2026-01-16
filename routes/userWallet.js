const express = require('express');
const router = express.Router();
const sql = require('mssql');

router.get('/', async (req, res) => {
    const { user_id } = req.query;
    try {
        const result = await sql.query`SELECT * FROM UserWallet WHERE user_id=${user_id}`;
        res.json({ wallet: result.recordset[0] });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/add', async (req, res) => {
    const { user_id, amount } = req.body;
    try {
        await sql.query`UPDATE UserWallet SET balance = balance + ${amount} WHERE user_id=${user_id}`;
        res.json({ message: 'تم إضافة الرصيد' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
