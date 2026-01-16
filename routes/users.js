const express = require('express');
const router = express.Router();
const { sql } = require('../db');

// تسجيل الدخول
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'البريد الإلكتروني وكلمة المرور مطلوبان' });
    }

    try {
        const request = new sql.Request();
        request.input('email', sql.NVarChar, email);
        request.input('password', sql.NVarChar, password);

        const result = await request.query(`
            SELECT user_id, full_name, email
            FROM Users
            WHERE email = @email AND password = @password
        `);

        if (result.recordset.length === 0) {
            return res.status(401).json({ message: 'البريد أو كلمة المرور غير صحيحة' });
        }

        res.json({ user: result.recordset[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'حدث خطأ داخلي' });
    }
});


module.exports = router;
