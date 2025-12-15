import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import EmployeeManagementApp from "./Components/EmployeeManagementApp";
import EmployeeDetails from "./Components/EmployeeDetails";

/**
 * App Component
 *
 * Root component of the application.
 * Handles client-side routing using React Router.
 *
 * Routes:
 * - "/" → Redirects to "/employee"
 * - "/employee" → Employee management dashboard
 * - "/employee/:id" → Employee details page
 *
 * @component
 * @returns {JSX.Element} Application routes
 */
function App() {
  return (
   <div className="w-full bg-gray-100">
      <BrowserRouter>
        <Routes>
          {/* Redirect root to employee page */}
          <Route path="/" element={<Navigate to="/employee" replace />} />

          {/* Employee management dashboard */}
          <Route path="/employee" element={<EmployeeManagementApp />} />

          {/* Employee details page */}
          <Route path="/employee/:id" element={<EmployeeDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
