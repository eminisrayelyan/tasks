import { findAllEmployees } from "../services/employee.service.js";

export const getEmployees = async function (req, res) {
  try {
    const { search, department, page, limit } = res.locals.filters;

    const result = await findAllEmployees(search, page, limit, department);

    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Failed to fetch employees",
    });
  }
};