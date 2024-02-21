const express = require('express')
const router = express.Router()
const clienteController = require('../controllers/cliente')
const validate = require('../middlewares/validateRequest')
const transacaoSchema = require('../schemas/transacao')
const extratoSchema = require('../schemas/extrato')


router.get('/', clienteController.getList)
router.post('/:clienteid/transacoes', validate(transacaoSchema), clienteController.createTransaction)
router.get('/:clienteid/extrato', validate(extratoSchema), clienteController.checkExtract)

module.exports = router;
