const axios = require('axios');

require('dotenv').config();
const PORT = process.env.PORT || 5000
const WARM_UP_TIMES = process.env.DB_CONN_LIMIT || 30

async function warmup() {
    try {
        console.log("WarmUp started ")
        for (let i = 0; i < WARM_UP_TIMES; i++) {
            await axios.get(`http://localhost:${PORT}/clientes/1/extrato`);
            await axios.get(`http://localhost:${PORT}/clientes/2/extrato`);
            await axios.get(`http://localhost:${PORT}/clientes/3/extrato`);
            await axios.get(`http://localhost:${PORT}/clientes/4/extrato`);
            await axios.get(`http://localhost:${PORT}/clientes/5/extrato`);
        }
        console.log("WarmUp finished 🔥")
    } catch (error) {
        console.error('Erro durante o WarmUp:', error);
    }
}

module.exports = warmup;
