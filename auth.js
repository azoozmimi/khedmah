const express = require('express');
const router = express.Router();
const sql = require('./db');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    const { full_name, national_id, phone, email, password } = req.body;

    if (!full_name || !national_id || !phone || !email || !password) {
        return res.status(400).send("All fields are required");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const request = new sql.Request();
        await request.query(`
            INSERT INTO Users (full_name, national_id, phone, email, password)
            VALUES ('${full_name}', '${national_id}', '${phone}', '${email}', '${hashedPassword}')
        `);
        res.send("User registered successfully!");
    } catch (err) {
        res.status(500).send("Error registering user: " + err);
    }
});

module.exports = router;
