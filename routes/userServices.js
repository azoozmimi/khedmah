const express = require('express');
const router = express.Router();
const sql = require('mssql');

router.get('/', async (req, res) => {
    const { user_id } = req.query;
    try {
        const result = await sql.query`SELECT * FROM UserServices WHERE user_id=${user_id}`;
        res.json({ services: result.recordset });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
    const { user_id, service_id } = req.body;
    try {
        await sql.query`INSERT INTO UserServices (user_id, service_id) VALUES (${user_id}, ${service_id})`;
        res.json({ message: 'تم إضافة الخدمة للمستخدم' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
