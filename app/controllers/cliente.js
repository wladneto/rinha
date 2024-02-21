const clienteService = require('../services/cliente')
const transacaoService = require('../services/transacao')
const extratoService = require('../services/extrato')

const clienteController = {

    getList: async (req, res) => {
        try {

            const data = await clienteService.getList()
            return res.status(200).json(data)

        } catch (error) {
            return res.status(error?.status || 500).json({ message: error?.message })
        }
    },

    createTransaction: async (req, res) => {
        try {
            const { clienteid } = req.params
            const { valor, tipo, descricao } = req.body
            const data = await transacaoService.create({ clienteid, valor, tipo, descricao })
            return res.status(200).json(data)

        } catch (error) {
            return res.status(error?.status || 422).json({ message: error?.message })
        }
    },

    checkExtract: async (req, res) => {
        try {
            const { clienteid } = req.params
            const data = await extratoService.get({ clienteid })
            return res.status(200).json(data)

        } catch (error) {
            return res.status(error?.status || 422).json({ message: error?.message })
        }
    }

}

module.exports = clienteController;