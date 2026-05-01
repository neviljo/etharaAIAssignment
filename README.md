# Team Task Manager

A full-stack web application for managing projects and tasks with team collaboration. Built with Next.js, TypeScript, Tailwind CSS, Prisma, and SQLite.

## Features

- User authentication (Signup/Login)
- Project management
- Task creation, assignment, and status tracking
- Role-based access control (Admin/Member)
- Dashboard with task overview
- RESTful APIs

## Tech Stack

- **Frontend:** Next.js 16, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** SQLite with Prisma ORM
- **Authentication:** NextAuth.js
- **Deployment:** Railway (planned)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Sign up for a new account or log in.
2. Create projects (Admin role required).
3. Add team members to projects.
4. Create and assign tasks.
5. Track task progress on the dashboard.

## API Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/[...nextauth]` - Authentication
- `GET /api/tasks` - Get user's tasks
- `POST /api/tasks` - Create a new task

## Database Schema

- Users (id, email, password, name, role)
- Projects (id, name, description, ownerId, members)
- Tasks (id, title, description, status, assignedToId, projectId, dueDate)

## Deployment

This app is designed to be deployed on Railway. For production, switch to PostgreSQL and update the database configuration.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License
