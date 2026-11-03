import EmployeeItem from "./EmployeeItem";

function EmployeeList({ employees }) {
  return (
    <div>
      <h2>Employees</h2>

      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <ul>
          {employees.map((employee) => (
            <EmployeeItem
              key={employee.id}
              employee={employee}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default EmployeeList;