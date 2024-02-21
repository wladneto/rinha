const { z } = require("zod");

const ExtratoSchema = z.object({
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

module.exports = ExtratoSchema;