import React, { useEffect, useState } from "react";
import { notify } from "../utils";
import { CreateEmployee, UpdateEmployeeById } from "../ApiControl/getAllEmployees";

function AddEmployee({ showModal, setShowModal, fetchEmployees, employeeObj }) {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    salary: "",
    profileImage: null,
  });

  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    if (employeeObj) {
      setEmployee(employeeObj);
      setUpdateMode(true);
    }
  }, [employeeObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleFileChange = (e) => {
    setEmployee({ ...employee, profileImage: e.target.files[0] });
  };

  const resetEmployeeStates = () => {
    setEmployee({
      name: "",
      email: "",
      phone: "",
      department: "",
      salary: "",
      profileImage: null,
    });
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const { success, message } = updateMode
        ? await UpdateEmployeeById(employee, employee._id)
        : await CreateEmployee(employee);

      success ? notify(message, "success") : notify(message, "error");

      setShowModal(false);
      resetEmployeeStates();
      fetchEmployees();
      setUpdateMode(false);
    } catch (err) {
      console.error(err);
      notify("Failed to create employee", "error");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setUpdateMode(false);
    resetEmployeeStates();
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {updateMode ? "Update Employee" : "Add Employee"}
          </h2>
          <button
            onClick={handleModalClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          <form onSubmit={handleAddEmployee} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={employee.name}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-md border px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={employee.email}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-md border px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={employee.phone}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-md border px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={employee.department}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-md border px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Salary
              </label>
              <input
                type="text"
                name="salary"
                value={employee.salary}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-md border px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Profile Image
              </label>
              <input
                type="file"
                name="profileImage"
                onChange={handleFileChange}
                className="mt-1 w-full rounded-md border px-3 py-2"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 transition"
            >
              {updateMode ? "Update" : "Save"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
