const express = require('express');
const router = express.Router();
const { getAllServices, addService } = require('../controllers/servicesController');

router.get('/', async (req, res) => {
    try {
        const services = await getAllServices();
        res.json({ services });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'حدث خطأ داخلي' });
    }
});

router.post('/', async (req, res) => {
    try {
        await addService(req.body);
        res.json({ message: 'تم إضافة الخدمة بنجاح' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'حدث خطأ داخلي' });
    }
});

module.exports = router;
