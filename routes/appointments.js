const express = require('express');
const router = express.Router();
const { getAllAppointments, addAppointment } = require('../controllers/appointmentsController');

router.get('/', async (req, res) => {
    try {
        const appointments = await getAllAppointments();
        res.json({ appointments });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'حدث خطأ داخلي' });
    }
});

router.post('/', async (req, res) => {
    try {
        await addAppointment(req.body);
        res.json({ message: 'تم إضافة الموعد بنجاح' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'حدث خطأ داخلي' });
    }
});

module.exports = router;
