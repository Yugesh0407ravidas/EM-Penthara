📘 Employee Management System (MERN + Tailwind)

A full-stack Employee Management System built with React (Vite) on the frontend and Node.js + Express + MongoDB on the backend.
It supports CRUD operations, image upload via Cloudinary, pagination, search, and a modern Tailwind UI.

🗂 Project Structure
root/
├── frontend/        # React + Vite + Tailwind application
├── backend/         # Node.js + Express + MongoDB API
├── .gitignore
├── README.md

🚀 Features
Frontend

⚛️ React 19 with Vite

🎨 Tailwind CSS

🔄 React Router v7

🔔 Toast notifications (react-toastify)

📄 Employee list with pagination

🔍 Search employees

➕ Add / ✏️ Update / 🗑 Delete employee

🖼 Upload profile image

Backend

🌐 Express REST API

🗄 MongoDB with Mongoose

☁️ Cloudinary image upload

📦 Multer for file handling

🔐 Environment-based configuration

🛠 Tech Stack
Frontend

React

Vite

Tailwind CSS

React Router DOM

React Toastify

Backend

Node.js

Express

MongoDB

Mongoose

Multer

Cloudinary

⚙️ Environment Variables
Backend (backend/.env)
PORT=8080
MONGO_URI=your_mongodb_connection_string

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

▶️ How to Run the Project
1️⃣ Clone the Repository
git clone https://github.com/your-username/employee-management-system.git
cd employee-management-system

2️⃣ Run Backend
cd backend
npm install
npm start


Backend runs on:

http://localhost:8080

3️⃣ Run Frontend
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173

🔄 API Endpoints (Backend)
Method	Endpoint	Description
GET	/api/employees	Get all employees
GET	/api/employees/:id	Get employee by ID
POST	/api/employees	Create employee
PUT	/api/employees/:id	Update employee
DELETE	/api/employees/:id	Delete employee
🖼 Image Upload Flow

Frontend sends multipart/form-data

Backend uses multer-storage-cloudinary

Cloudinary returns image URL

URL is stored in MongoDB

Image is rendered directly from Cloudinary

🧠 Key Learnings

Proper separation of frontend & backend

Handling file uploads safely

Avoiding React StrictMode side effects

Correct use of FormData with updates

Clean Tailwind layouts without scroll bugs

📌 Future Improvements

Authentication (JWT)

Role-based access

Image preview before upload

Soft delete

Dark mode

Deployment (Vercel + Render)

👤 Author

Yugesh Ravidas
📧 yugeshravidas0407@gmail.com