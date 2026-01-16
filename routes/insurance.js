const express = require('express');
const router = express.Router();

// عرض كل التأمينات
router.get('/', async (req, res) => {
    // استعلام SQL لجلب بيانات التأمين
    res.json({ message: 'عرض كل التأمينات' });
});

// إضافة تأمين جديد
router.post('/', async (req, res) => {
    // استعلام SQL لإضافة تأمين
    res.json({ message: 'تم إضافة التأمين' });
});

// تحديث التأمين
router.put('/:id', async (req, res) => {
    // استعلام SQL لتحديث التأمين حسب ID
    res.json({ message: 'تم تحديث التأمين' });
});

// حذف التأمين
router.delete('/:id', async (req, res) => {
    // استعلام SQL لحذف التأمين حسب ID
    res.json({ message: 'تم حذف التأمين' });
});

module.exports = router;
