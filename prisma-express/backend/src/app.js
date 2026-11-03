import express from "express";
import employeeRouter from "./routes/employee.routes.js";

const app = express();

app.use(express.json());

app.use("/api/employees", employeeRouter);

export default app;