import * as z from "zod";

export const validatorRequest = (schema, source = "body") => {
    return (req, res, next) => {
        const result = schema.safeParse(req[source]);
        
        if (!result.success) {
            const flattened = z.flattenError(result.error);

            return res.status(400).json({
                status: "fail",
                message: "Validation failed",
                errors: result.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                    code: issue.code,
                })),
                formErrors: flattened.formErrors,
                fieldErrors: flattened.fieldErrors,
            });
        }

        req[source] = result.data;
        next();
    };
};
