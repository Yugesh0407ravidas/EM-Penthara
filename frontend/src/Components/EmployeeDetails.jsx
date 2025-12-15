import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetEmployeeDetailsById } from "../ApiControl/getAllEmployees";

/**
 * EmployeeDetails Component
 *
 * Displays detailed information of a single employee
 * fetched using the employee ID from route parameters.
 *
 * @component
 * @returns {JSX.Element} Employee details view
 */
const EmployeeDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);

  /**
   * Fetch employee details by ID
   *
   * Calls the backend API to retrieve employee information
   * and updates the local state.
   *
   * @async
   * @function fetchEmployeeDetails
   * @returns {Promise<void>}
   */
  const fetchEmployeeDetails = async () => {
    try {
      const data = await GetEmployeeDetailsById(id);
      setEmployee(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch employee details");
    }
  };

  /**
   * Fetch employee data when component mounts
   * or when the employee ID changes.
   */
  useEffect(() => {
    fetchEmployeeDetails();
  }, [id]);

  if (!employee) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-gray-600">
        Employee not found
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-4xl px-4">
      <div className="rounded-lg bg-white shadow-lg">
        {/* Header */}
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Employee Details
          </h2>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <div className="flex flex-col gap-6 md:flex-row">
            {/* Profile Image */}
            <div className="md:w-1/4">
              <img
                src={employee.profileImage}
                alt={employee.name}
                className="w-full rounded-lg object-cover"
              />
            </div>

            {/* Employee Info */}
            <div className="md:w-3/4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {employee.name}
              </h3>
              <p>
                <span className="font-medium text-gray-700">Email:</span>{" "}
                {employee.email}
              </p>
              <p>
                <span className="font-medium text-gray-700">Phone:</span>{" "}
                {employee.phone}
              </p>
              <p>
                <span className="font-medium text-gray-700">Department:</span>{" "}
                {employee.department}
              </p>
              <p>
                <span className="font-medium text-gray-700">Salary:</span>{" "}
                {employee.salary}
              </p>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-6">
            <button
              onClick={() => navigate("/employee")}
              className="rounded-md bg-blue-600 px-5 py-2 text-white font-medium hover:bg-blue-700 transition"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
