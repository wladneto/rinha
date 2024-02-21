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
    await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
    //console.log('Finished setting the isolation level to read committed');
    await connection.beginTransaction();
    try {
        let clients = await connection.execute(`SELECT * FROM clientes`);

        await connection.commit();

        return clients[0];
    } catch (err) {
        connection.rollback();
        console.info('Rollback successful');
        return 'Error';
    }
}


module.exports = clienteService;
