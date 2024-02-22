const { pool } = require("../dbConnection");

const clienteService = {

    getList: () => new Promise((resolve, reject) => {
        try {
            resolve(listClients())
        } catch (error) {
            reject(error)
        }
    }),

}


async function listClients() {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    try {
        let clients = await connection.execute(`SELECT * FROM clientes`);

        await connection.commit();

        return clients[0];
    } catch (err) {
        connection.rollback();
        return 'Error';
    }
}


module.exports = clienteService;
