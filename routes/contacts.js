const express = require('express');
const router = express.Router();
const sql = require('mssql');

router.get('/', async (req, res) => {
    try {
        const result = await sql.query('SELECT * FROM Contacts');
        res.json({ contacts: result.recordset });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
    const { user_id, subject, message } = req.body;
    try {
        await sql.query`INSERT INTO Contacts (user_id, subject, message) VALUES (${user_id}, ${subject}, ${message})`;
        res.json({ message: 'تم إرسال الرسالة' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
