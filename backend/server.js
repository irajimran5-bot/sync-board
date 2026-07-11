require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("CRITICAL ERROR: MONGO_URI environment variable is completely missing!");
}
if (mongoose.connection.readyState === 0) {
    mongoose.connect(MONGO_URI)
        .then(() => console.log("Database Connection is SUCCESSFUL"))
        .catch((err) => console.log('Critical FAILURE ->', err));
}

app.get('/', (req, res) => {
    res.json({ message: "SyncBoard API is running smoothly" });
});
app.use('/api/boards', require('./routes/boardRoutes'));
app.use('/api/lists', require('./routes/listRoutes'));
app.use('/api/cards', require('./routes/cardRoutes'));
module.exports = app;
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Running on port: ${PORT}`);
    });
}