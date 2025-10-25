const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const { initPostgres } = require('./repositories/postgres');
const { initMongo } = require('./repositories/mongo');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// init DBs
initPostgres();
initMongo();

app.use('/api/:db/auth', authRoutes);
app.use('/api/:db/users', userRoutes);

app.get('/', (req, res) => res.json({ ok: true }));

module.exports = app;
