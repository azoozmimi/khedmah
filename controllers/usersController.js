const express = require('express');
const router = express.Router();

// ====== LOGIN ======
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // مؤقتاً: بيانات ثابتة للتجربة
    if (email === 'azooz@example.com' && password === '123456') {
        res.json({
            user: {
                id: 1,
                name: 'عزوز',
                email: email
            }
        });
    } else {
        res.status(401).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }
});

// ====== PROFILE ======
router.get('/profile', (req, res) => {
    const userId = req.query.user_id;

    // بيانات ثابتة للتجربة
    res.json({
        user: {
            id: userId,
            name: "عزوز",
            nationalId: "123456789",
            email: "azooz@example.com",
            phone: "777123456",
            services: [
                { name: "إصدار رخصة قيادة جديدة" },
                { name: "تجديد رخصة قيادة" }
            ],
            fines: [
                { id: 101, type: "سرعة زائدة", amount: 5000 }
            ]
        }
    });
});

module.exports = router;
