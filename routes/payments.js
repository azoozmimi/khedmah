const express = require('express');
const router = express.Router();
const { getAllPayments, addPayment } = require('../controllers/paymentsController');

router.get('/', async (req, res) => {
    try {
        const payments = await getAllPayments();
        res.json({ payments });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'حدث خطأ داخلي' });
    }
});

router.post('/', async (req, res) => {
    try {
        await addPayment(req.body);
        res.json({ message: 'تم إضافة الدفع بنجاح' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'حدث خطأ داخلي' });
    }
});

module.exports = router;
