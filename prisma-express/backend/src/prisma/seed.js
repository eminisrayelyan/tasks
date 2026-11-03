import "dotenv/config";
import { db } from "./db.ts";

const departments = [
  "IT",
  "HR",
  "Marketing",
  "Finance",
];

const employees = [
  { name: "John Smith", email: "john@example.com", department: "IT" },
  { name: "David Miller", email: "david@example.com", department: "IT" },
  { name: "Emma Wilson", email: "emma@example.com", department: "IT" },
  { name: "Michael Lee", email: "michael@example.com", department: "IT" },
  { name: "Daniel Clark", email: "daniel@example.com", department: "IT" },

  { name: "Anna Brown", email: "anna@example.com", department: "HR" },
  { name: "Sarah Davis", email: "sarah@example.com", department: "HR" },
  { name: "Olivia Martin", email: "olivia@example.com", department: "HR" },
  { name: "James Taylor", email: "james@example.com", department: "HR" },
  { name: "Sophia White", email: "sophia@example.com", department: "HR" },

  { name: "Robert King", email: "robert@example.com", department: "Marketing" },
  { name: "Emily Scott", email: "emily@example.com", department: "Marketing" },
  { name: "William Green", email: "william@example.com", department: "Marketing" },
  { name: "Mia Adams", email: "mia@example.com", department: "Marketing" },
  { name: "Lucas Hall", email: "lucas@example.com", department: "Marketing" },

  { name: "Noah Young", email: "noah@example.com", department: "Finance" },
  { name: "Ava Walker", email: "ava@example.com", department: "Finance" },
  { name: "Liam Harris", email: "liam@example.com", department: "Finance" },
  { name: "Grace Lewis", email: "grace@example.com", department: "Finance" },
  { name: "Ethan Allen", email: "ethan@example.com", department: "Finance" },
];

const projects = [
  { name: "Website", description: "Company website development" },
  { name: "Mobile App", description: "Mobile application development" },
  { name: "Marketing Campaign", description: "Product marketing" },
];

const assignments = [
  { email: "john@example.com", project: "Website" },
  { email: "john@example.com", project: "Mobile App" },
  { email: "david@example.com", project: "Website" },
  { email: "emma@example.com", project: "Mobile App" },
  { email: "anna@example.com", project: "Website" },
  { email: "robert@example.com", project: "Marketing Campaign" },
  { email: "emily@example.com", project: "Marketing Campaign" },
  { email: "mia@example.com", project: "Mobile App" },
];

async function main() {
  const departmentIds = {};
  const employeeIds = {};
  const projectIds = {};

  for (const name of departments) {
    let department = await db.orm.public.Department.first({ name });

    if (!department) {
      department = await db.orm.public.Department.create({ name });
    }

    departmentIds[name] = department.id;
  }

  for (const employee of employees) {
    let existing = await db.orm.public.Employee.first({
      email: employee.email,
    });

    if (!existing) {
      existing = await db.orm.public.Employee.create({
        name: employee.name,
        email: employee.email,
        departmentId: departmentIds[employee.department],
      });
    }

    employeeIds[employee.email] = existing.id;
  }

  for (const project of projects) {
    let existing = await db.orm.public.Project.first({
      name: project.name,
    });

    if (!existing) {
      existing = await db.orm.public.Project.create(project);
    }

    projectIds[project.name] = existing.id;
  }

  for (const assignment of assignments) {
    const employeeId = employeeIds[assignment.email];
    const projectId = projectIds[assignment.project];

    const existing = await db.orm.public.EmployeeProject.first({
      employeeId,
      projectId,
    });

    if (!existing) {
      await db.orm.public.EmployeeProject.create({
        employeeId,
        projectId,
      });
    }
  }

  console.log("Database seeded");
}

try {
  await main();
} catch (error) {
  console.log("Seeding failed:", error);
} finally {
  await db.close();
}