require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// Strict connection using ONLY the string provided
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log("Database Connection is SUCCESSFUL"))
  .catch((err) => console.log('Critical FAILURE ->', err));

app.get('/', (req, res) => {
    res.json({ message: "SyncBoard API is running smoothly" });
});

app.use('/api/boards', require('./routes/boardRoutes'));
app.use('/api/lists', require('./routes/listRoutes'));
app.use('/api/cards', require('./routes/cardRoutes'));

module.exports = app;