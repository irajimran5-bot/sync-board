require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

let cachedConnection = null;

async function connectDatabase() {
    if (cachedConnection && mongoose.connection.readyState === 1) {
        return cachedConnection;
    }
    
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI environment variable is completely missing in Vercel settings!");
    }

    
    cachedConnection = await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000 
    });
    
    return cachedConnection;
}


app.use(async (req, res, next) => {
    try {
        await connectDatabase();
        next();
    } catch (err) {
        console.error("DATABASE FAIL:", err.message);
       
        return res.status(500).json({ 
            error: "Database Connection Failed", 
            reason: err.message 
        });
    }
});

app.get('/', (req, res) => {
    res.json({ message: "SyncBoard API is running smoothly and cloud database is verified!" });
});

app.use('/api/boards', require('./routes/boardRoutes'));
app.use('/api/lists', require('./routes/listRoutes'));
app.use('/api/cards', require('./routes/cardRoutes'));

module.exports = app;