const { z } = require("zod");

const TransacaoSchema = z.object({
    body: z.object({
        valor: z.number().int().positive(),
        tipo: z.enum(['c', 'd']),
        descricao: z.string().max(10).min(1),
    }),
    params: z.object({
        clienteid: z.string().min(1).refine((val) => {
            try {
                if (/^\d+$/.test(val)) {
                    return val;
                }
                return false;
            } catch (error) {
                return false;
            }
        }, {
            message: 'Id must be a number',
        },),
    }),
});

module.exports = TransacaoSchema;