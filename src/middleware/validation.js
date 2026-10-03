// Generic Validation Middleware
const validate = (schema, property = "body") => {
    return (req, res, next) => {

        try {
            const { error, value } = schema.validate(req[property], {
                abortEarly: false,
                stripUnknown: true,
            });

            if (error) {
                const errors = error.details.map((detail) => ({
                    field: detail.path.join("."),
                    message: detail.message,
                }));

                return res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors,
                });
            }

            req[property] = value;

            next();

        } catch (err) {
            next(err);
        }
    };
};

export default validate;