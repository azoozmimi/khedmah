const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

// ربط كل الـ routes
app.use('/api', routes);

// Route رئيسي للباكند
app.get('/', (req, res) => res.send('Khadma Backend is running!'));

connectDB()
  .then(() => app.listen(port, () => console.log(`Server running on port ${port}`)))
  .catch(err => console.error("Failed to start server due to DB error:", err));
