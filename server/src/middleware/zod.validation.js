const validateZod = (schema, property = "body") =>
  (req, res, next) => {
    try {
        const data = schema.parse(req[property]);
        req[property] = data; // sanitized data
        next();
    } catch (err) {
        next(err); 
    }
};

export default validateZod;