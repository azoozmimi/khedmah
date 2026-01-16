const express = require('express');
const router = express.Router();
const sql = require('mssql');

router.get('/', async (req, res) => {
    try {
        const result = await sql.query('SELECT * FROM News ORDER BY created_at DESC');
        res.json({ news: result.recordset });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
    const { title, content } = req.body;
    try {
        await sql.query`INSERT INTO News (title, content) VALUES (${title}, ${content})`;
        res.json({ message: 'تم إضافة الخبر' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
