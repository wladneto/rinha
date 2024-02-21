const { z } = require("zod");

const validateRequest = (schema) => (req, res, next) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
  
      next();
    } catch (err) {
      return res.status(422).send(err.errors);
    }
  };

module.exports = validateRequest;