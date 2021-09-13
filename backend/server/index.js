const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = 4000;

const { router: stockRouter } = require('./routes/stock');
const { router: authRouter } = require('./routes/auth');

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/stock', stockRouter);
app.use('/auth', authRouter);


app.listen(PORT, () => {
    console.log("Server OK ")
});