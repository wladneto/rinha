const { pool } = require("../dbConnection");
require('dotenv').config();

const transacaoService = {
    create: ({ clienteid, valor, tipo, descricao }) => new Promise(async (resolve, reject) => {
        if (process.env.FORCE_JUST_5_CLIENTS && (clienteid < 1 || clienteid > 5)) {
            const error = new Error(`Cliente não existe - FORCE_JUST_5_CLIENTS -> ${process.env.FORCE_JUST_5_CLIENTS}`);
            error.status = 404;
            reject(error);
        }

        const connection = await pool.getConnection();

        await connection.beginTransaction();
        try {

            //captura informações do cliente
            let cliente = await connection.execute('SELECT saldo, limite FROM clientes WHERE id = ? FOR UPDATE', [clienteid]);

            if (cliente[0].length === 0) {
                const error = new Error("Cliente não existe");
                error.status = 404
                throw error;
            }

            //verifica limite de acordo com transacao
            let saldoAtualizado;
            let limite = cliente[0][0].limite;
            let saldo = cliente[0][0].saldo;
            if (tipo == 'd') {
                if (saldo - valor < -limite) {
                    const error = new Error("Cliente não possui limite disponivel");
                    error.status = 422
                    throw error;
                }
                saldoAtualizado = saldo - valor;
            } else {
                saldoAtualizado = saldo + valor;
            }

            //atualiza saldo na tabela clientes
            let tabelaClienteAtualizada = await connection.execute('UPDATE clientes SET saldo = ? WHERE id = ?', [saldoAtualizado, clienteid]);

            if (tabelaClienteAtualizada[0].length === 0) {
                const error = new Error("Não atualizou a tabela de cliente");
                error.status = 422
                throw error;
            }

            await connection.commit();

            //insere transacao na tabela transacao
            let tabelaTransacoesInserida = await connection.execute('INSERT INTO transacoes(cliente_id, valor, tipo, descricao, realizada_em) VALUES(?, ?, ?, ?, NOW())', [clienteid, valor, tipo, descricao]);

            if (tabelaTransacoesInserida[0].length === 0) {
                const error = new Error("Não inseriu na tabela de transacao");
                error.status = 422
                throw error;
            }

            resolve({
                "limite": limite,
                "saldo": saldoAtualizado
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

module.exports = transacaoService;
