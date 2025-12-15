import React from "react";
import { Link } from "react-router-dom";
import { DeleteEmployeeById } from "../ApiControl/getAllEmployees";
import { notify } from "../utils";

/**
 * EmployeeTable Component
 *
 * Renders a table of employees with pagination,
 * view, update, and delete actions.
 *
 * @component
 * @param {Object} props
 * @param {Array} props.employees - List of employee objects
 * @param {Object} props.pagination - Pagination details
 * @param {Function} props.fetchEmployees - Fetch employees function
 * @param {Function} props.handleUpdateEmployee - Update employee handler
 * @returns {JSX.Element}
 */
function EmployeeTable({
  employees,
  pagination,
  fetchEmployees,
  handleUpdateEmployee,
}) {
  const headers = ["Name", "Email", "Phone", "Department", "Actions"];
  const { currentPage, totalPages } = pagination;

  /**
   * Navigate to the next page
   */
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePagination(currentPage + 1);
    }
  };

  /**
   * Navigate to the previous page
   */
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePagination(currentPage - 1);
    }
  };

  /**
   * Fetch employees for selected page
   *
   * @param {number} page
   */
  const handlePagination = (page) => {
    fetchEmployees("", page, 5);
  };

  /**
   * Delete employee by ID
   *
   * @async
   * @param {string} id - Employee ID
   * @returns {Promise<void>}
   */
  const handleDeleteEmployee = async (id) => {
    try {
      const { success, message } = await DeleteEmployeeById(id);
      success ? notify(message, "success") : notify(message, "error");
      fetchEmployees();
    } catch (err) {
      console.error(err);
      notify("Failed to delete employee", "error");
    }
  };

  /**
   * Table row for a single employee
   *
   * @param {Object} props
   * @param {Object} props.employee
   * @returns {JSX.Element}
   */
  const TableRow = ({ employee }) => {
    return (
      <tr className="border-b hover:bg-gray-50">
        <td className="px-4 py-3 text-blue-600 hover:underline">
          <Link to={`/employee/${employee._id}`}>
            {employee.name}
          </Link>
        </td>
        <td className="px-4 py-3">{employee.email}</td>
        <td className="px-4 py-3">{employee.phone}</td>
        <td className="px-4 py-3">{employee.department}</td>
        <td className="px-4 py-3">
          <div className="flex gap-3">
            <button
              title="Edit"
              onClick={() => handleUpdateEmployee(employee)}
              className="rounded bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700 hover:bg-yellow-200"
            >
              Edit
            </button>
            <button
              title="Delete"
              onClick={() => handleDeleteEmployee(employee._id)}
              className="rounded bg-red-100 px-3 py-1 text-sm font-medium text-red-700 hover:bg-red-200"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg bg-white shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-700"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td
                  colSpan={headers.length}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  Data not found
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <TableRow employee={emp} key={emp._id} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex flex-col items-center justify-between gap-3 md:flex-row">
        <span className="rounded bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
          Page {currentPage} of {totalPages}
        </span>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="rounded border px-3 py-1 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => handlePagination(page)}
              className={`rounded border px-3 py-1 text-sm ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="rounded border px-3 py-1 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default EmployeeTable;
