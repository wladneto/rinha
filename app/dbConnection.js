require('dotenv').config();

let mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'rinha',
    connectionLimit: process.env.DB_CONN_LIMIT || 15,
});

exports.pool = pool;