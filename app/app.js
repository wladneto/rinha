var express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const { pool } = require('./dbConnection');

var app = express();
const PORT = process.env.PORT || 5000

require('dotenv').config();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json())

const clienteRouter = require('./routes/cliente')
app.use('/clientes', clienteRouter)

app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
});


