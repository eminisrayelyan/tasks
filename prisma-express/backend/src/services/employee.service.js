import { db } from "../prisma/db.ts";
import { or } from "@prisma/orm-postgres/orm-client";

export const findAllEmployees = async function (search, page, limit, department) {
  let query = db.orm.public.Employee;

  if (search) {
    query = query.where((e) =>
      or(
        e.name.ilike(`%${search}%`),
        e.email.ilike(`%${search}%`)
      )
    );
  }

  if (department) {
    const found = await db.orm.public.Department
      .where({ name: department })
      .first();

    if (!found) {
      return {
        employees: [],
        total: 0,
        page,
        limit,
        totalPages: 0,
      };
    }

    query = query.where({
      departmentId: found.id,
    });
  }

  const { total } = await query.aggregate((a) => ({
    total: a.count(),
  }));

  const employees = await query
    .include("department")
    .orderBy((e) => e.id.asc())
    .offset((page - 1) * limit)
    .limit(limit)
    .all();

  return {
    employees,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};