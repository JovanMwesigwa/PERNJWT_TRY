const express = require('express');
const cors = require('cors');
require('dotenv').config()

const router = require('./routes/users.js');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/auth', router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));