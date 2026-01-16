const express = require('express');
const router = express.Router();
const sql = require('mssql');

router.get('/', async (req, res) => {
    try {
        const result = await sql.query('SELECT * FROM Violations');
        res.json({ violations: result.recordset });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
    const { user_id, description, amount, status } = req.body;
    try {
        await sql.query`INSERT INTO Violations (user_id, description, amount, status) VALUES (${user_id}, ${description}, ${amount}, ${status})`;
        res.json({ message: 'تم إضافة المخالفة' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { description, amount, status } = req.body;
    try {
        await sql.query`UPDATE Violations SET description=${description}, amount=${amount}, status=${status} WHERE violation_id=${id}`;
        res.json({ message: 'تم تحديث المخالفة' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await sql.query`DELETE FROM Violations WHERE violation_id=${id}`;
        res.json({ message: 'تم حذف المخالفة' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
