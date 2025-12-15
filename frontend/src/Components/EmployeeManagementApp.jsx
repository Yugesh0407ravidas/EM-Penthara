import React, { useEffect, useState } from "react";
import EmployeeTable from "./EmployeeTable";
import AddEmployee from "./AddEmployee";
import { DeleteEmployeeById, GetAllEmployees } from "../ApiControl/getAllEmployees";
import { ToastContainer } from "react-toastify";
import { notify } from "../utils";

/**
 * EmployeeManagementApp Component
 *
 * Main container component responsible for:
 * - Fetching employees
 * - Searching employees
 * - Managing add/update employee modal
 * - Rendering employee table and forms
 *
 * @component
 * @returns {JSX.Element} Employee management dashboard
 */
const EmployeeManagementApp = () => {
  const [showModal, setShowModal] = useState(false);
  const [employeeObj, setEmployeeObj] = useState(null);

  const [employeesData, setEmployeesData] = useState({
    employees: [],
    pagination: {
      currentPage: 1,
      pageSize: 5,
      totalEmployees: 0,
      totalPages: 0,
    },
  });

  /**
   * Fetch employees from backend with optional
   * search, pagination, and limit parameters.
   *
   * @async
   * @function fetchEmployees
   * @param {string} search - Search keyword
   * @param {number} page - Current page number
   * @param {number} limit - Number of records per page
   * @returns {Promise<void>}
   */
  const fetchEmployees = async (search = "", page = 1, limit = 5) => {
    try {
      const data = await GetAllEmployees(search, page, limit);
      setEmployeesData(data);
    } catch (err) {
      console.error(err);
      notify("Failed to fetch employees", "error");
    }
  };

  /**
   * Fetch employees on component mount
   */
  useEffect(() => {
    fetchEmployees();
  }, []);

  /**
   * Handle search input change
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleSearch = (e) => {
    fetchEmployees(e.target.value);
  };

  /**
   * Open modal in update mode
   *
   * @param {Object} emp - Selected employee object
   */
  const handleUpdateEmployee = (emp) => {
    setEmployeeObj(emp);
    setShowModal(true);
  };

  return (
    <div className="flex w-full flex-col items-center bg-gray-100 p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Employee Management App
      </h1>

      <div className="w-full max-w-6xl rounded-lg bg-white p-6 shadow-md">
        {/* Action Bar */}
        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <button
            onClick={() => {
              setEmployeeObj(null);
              setShowModal(true);
            }}
            className="w-full rounded-md bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 transition md:w-auto"
          >
            Add Employee
          </button>

          <input
            type="text"
            placeholder="Search employees..."
            onChange={handleSearch}
            className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 md:w-1/2"
          />
        </div>

        {/* Employee Table */}
        <EmployeeTable
          employees={employeesData.employees}
          pagination={employeesData.pagination}
          fetchEmployees={fetchEmployees}
          handleUpdateEmployee={handleUpdateEmployee}
        />
      </div>

      {/* Add / Update Employee Modal */}
      {/* <AddEmployee
        fetchEmployees={fetchEmployees}
        showModal={showModal}
        setShowModal={setShowModal}
        employeeObj={employeeObj}
      /> */}


<AddEmployee
  fetchEmployees={fetchEmployees}
  showModal={showModal}
  setShowModal={(value) => {
    if (!value) setEmployeeObj(null); // 🔑 CRITICAL
    setShowModal(value);
  }}
  employeeObj={employeeObj}
/>


      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default EmployeeManagementApp;
