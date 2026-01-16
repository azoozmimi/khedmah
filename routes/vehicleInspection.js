const express = require('express');
const router = express.Router();
const sql = require('mssql');

router.get('/', async (req, res) => {
    try {
        const result = await sql.query('SELECT * FROM VehicleInspection');
        res.json({ inspections: result.recordset });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
    const { vehicle_id, inspection_date, result } = req.body;
    try {
        await sql.query`INSERT INTO VehicleInspection (vehicle_id, inspection_date, result) VALUES (${vehicle_id}, ${inspection_date}, ${result})`;
        res.json({ message: 'تم إضافة الفحص' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { inspection_date, result } = req.body;
    try {
        await sql.query`UPDATE VehicleInspection SET inspection_date=${inspection_date}, result=${result} WHERE inspection_id=${id}`;
        res.json({ message: 'تم تحديث الفحص' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await sql.query`DELETE FROM VehicleInspection WHERE inspection_id=${id}`;
        res.json({ message: 'تم حذف الفحص' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
