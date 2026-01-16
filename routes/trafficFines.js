const express = require('express');
const router = express.Router();
const { getAllFines, addFine } = require('../controllers/trafficFinesController');

router.get('/', async (req, res) => {
    try {
        const fines = await getAllFines();
        res.json({ fines });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'حدث خطأ داخلي' });
    }
});

router.post('/', async (req, res) => {
    try {
        await addFine(req.body);
        res.json({ message: 'تم إضافة المخالفة بنجاح' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'حدث خطأ داخلي' });
    }
});

module.exports = router;
