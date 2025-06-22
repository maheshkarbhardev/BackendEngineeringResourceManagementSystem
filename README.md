Engineering Resource Management System

A full-stack application to manage engineers, projects, assignments, capacity tracking, and dashboards — with role-based access.

======================================================================

	Tech Stack:- 
•	Frontend: React.js 
•	Backend: Node.js + Express.js
•	Database: MySQL
•	Authentication: JWT (Role-based access)
•	AI Tools Used: ChatGPT

	Features
User Roles: Admin, Manager, Engineer
Engineer Management: Add/edit engineers and their capacity
Project Management: Manage projects with timelines
Assignments: Assign engineers to projects with hours
Dashboard: Track engineer capacity and utilization %
Role-Based Access: Secure APIs by user type

	Project Structure For Backend

controllers/
├── authController.js
├── userController.js
├── engineerController.js
├── projectController.js
├── assignmentController.js
└── dashboardController.js

routes/
├── authRoutes.js
├── userRoutes.js
├── engineerRoutes.js
├── projectRoutes.js
├── assignmentRoutes.js
└── dashboardRoutes.js

middleware/
└── authMiddleware.js

config/
└── db.js

server.js
README.md
.env

	How AI Tools Were Used

•	ChatGPT

	Generated capacity tracking logic

	Sample .env
•	env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=engineering_db
JWT_SECRET=your_jwt_secret


	How to Run
npm install
npm start

