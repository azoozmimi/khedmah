const express = require('express');
const router = express.Router();
const { getAllVehicles, addVehicle } = require('../controllers/vehiclesController');

router.get('/', async (req, res) => {
    try {
        const vehicles = await getAllVehicles();
        res.json({ vehicles });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'حدث خطأ داخلي' });
    }
});

router.post('/', async (req, res) => {
    try {
        await addVehicle(req.body);
        res.json({ message: 'تم إضافة المركبة بنجاح' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'حدث خطأ داخلي' });
    }
});

module.exports = router;
