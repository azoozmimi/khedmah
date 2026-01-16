const express = require('express');
const router = express.Router();
const sql = require('mssql');

router.get('/', async (req, res) => {
    try {
        const result = await sql.query('SELECT * FROM AuditLog ORDER BY created_at DESC');
        res.json({ logs: result.recordset });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
