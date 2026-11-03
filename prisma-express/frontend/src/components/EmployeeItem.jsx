function EmployeeItem({ employee }) {
    return (
      <li>
        <h3>{employee.name}</h3>
        <p>Email: {employee.email}</p>
        <p>Department: {employee.department.name}</p>
      </li>
    );
  }
  
  export default EmployeeItem;