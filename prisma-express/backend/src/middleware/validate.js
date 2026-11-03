import { z } from "zod";

const employeeQuerySchema = z.object({
  search: z.string().trim().max(30).default(""),
  department: z.enum([
    "",
    "IT",
    "HR",
    "Finance",
    "Marketing",
  ]).default(""),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(30).default(5),
});

const validate = (req, res, next) => {
  const result = employeeQuerySchema.safeParse(req.query);

  if (!result.success) {
    return res.status(400).json({
      error: "Error"
    });
  }

  res.locals.filters = result.data;

  next();
};

export default validate;