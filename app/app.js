var express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const warmup = require('./warmup');

require('dotenv').config();
const PORT = process.env.PORT || 5000

var app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json())

const clienteRouter = require('./routes/cliente')
app.use('/clientes', clienteRouter)

app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
    warmup()
});


