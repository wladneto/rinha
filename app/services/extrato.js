const { pool } = require("../dbConnection");
require('dotenv').config();

const extratoService = {
    get: ({ clienteid }) => new Promise(async (resolve, reject) => {
        if (process.env.FORCE_JUST_5_CLIENTS && (clienteid < 1 || clienteid > 5)) {
            const error = new Error(`Cliente não existe - FORCE_JUST_5_CLIENTS -> ${process.env.FORCE_JUST_5_CLIENTS}`);
            error.status = 404;
            reject(error);
        }


        const connection = await pool.getConnection();
        //await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
        //set wait timeout and lock wait timeout as per need.
        await connection.beginTransaction();
        try {

            //captura informações do cliente
            let cliente = await connection.execute('SELECT saldo, limite FROM clientes WHERE id = ?', [clienteid]);

            if (cliente[0].length === 0) {
                const error = new Error("Cliente não existe");
                error.status = 404
                throw error;
            }

            let limite = cliente[0][0].limite;
            let saldo = cliente[0][0].saldo;
            //seleciona as transacoes
            let transacoes = await connection.execute('SELECT valor, tipo, descricao, realizada_em FROM transacoes WHERE cliente_id = ? ORDER BY id DESC LIMIT 10', [clienteid]);


            //await connection.commit();

            const data_extrato = new Date();

            resolve({
                "saldo": {
                    "total": saldo,
                    "data_extrato": data_extrato.toISOString(),
                    "limite": limite
                },
                "ultimas_transacoes": transacoes[0] || []
            });

        } catch (err) {
            await connection.rollback();
            console.info('Rollback successful');
            reject(err)
        } finally {

            await connection.release();

        }
    })
}

module.exports = extratoService;
