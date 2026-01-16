const express = require('express');
const router = express.Router();

// مثال GET
router.get('/', (req, res) => {
  res.json({ message: "Driver Licenses endpoint works!" });
});

module.exports = router;
