import { useState, useEffect } from "react";
import EmployeeList from "./components/EmployeeList";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import './App.css'

function App() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchEmployees = async function () {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          search,
          department,
          page: String(page),
          limit: String(limit),
        });

        const response = await fetch(
          `/api/employees?${params}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Error");
        }

        const data = await response.json();

        if (controller.signal.aborted) {
          return;
        }

        setEmployees(data.employees);
        setTotalPages(data.totalPages);
        setTotal(data.total);
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchEmployees();

    return () => controller.abort();
  }, [search, department, page, limit]);

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
    setPage(1);
  };

  const handleLimitChange = (event) => {
    setLimit(Number(event.target.value));
    setPage(1);
  };

  return (
    <main>
      <h1>Employee Management</h1>

      <SearchBar
        search={search}
        setSearch={handleSearch}
      />

      <div>
        <label htmlFor="department">Department: </label>
        <select
          id="department"
          value={department}
          onChange={handleDepartmentChange}
        >
          <option value="">All Departments</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      <div>
        <label htmlFor="perPage">Items per page: </label>
        <select
          id="perPage"
          value={limit}
          onChange={handleLimitChange}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      {loading && <p>Loading employees...</p>}
      {error && <p>Error: {error}</p>}

      {!loading && !error && (
        <>
          <p>{total} employees found</p>

          <EmployeeList employees={employees} />

          <Pagination
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        </>
      )}
    </main>
  );
}

export default App;
