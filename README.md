# PrepTrack — MERN Student Project
**Study & Interview Preparation Planner**

---

## 1. Introduction

### 1.1 Purpose
This document defines the end-to-end technical design and implementation of **PrepTrack**, a full-stack web application that helps users organize, plan, and track their study sessions, interview preparation, and tasks in a structured manner.

### 1.2 Target Audience
- Students preparing for exams and interviews
- Job seekers organizing interview preparation
- Developers learning MERN stack development
- Anyone interested in building productivity applications

### 1.3 Learning Outcomes
- CRUD operations using MongoDB, Express, and Node.js
- User authentication with JWT and bcrypt
- REST API architecture
- MongoDB schema design using Mongoose
- Frontend development using React
- State management and routing
- Responsive UI design with Material-UI (MUI)
- Protected routes and authentication flow

---

## 2. System Overview

### 2.1 User Roles

| Role  | Description                                      |
|-------|--------------------------------------------------|
| User  | Creates, manages study sessions, tasks, and interview questions |

### 2.2 Core Features

**User Features:**
- User registration and login with JWT authentication
- Create and manage study sessions with time tracking
- Track interview questions by topic and company
- Manage tasks with priority levels and due dates
- Personal dashboard for all activities
- Profile management

**Study Session Features:**
- Subject-based organization
- Date and time tracking (start/end time)
- Daily goal setting
- Session notes

**Interview Question Features:**
- Question tracking by topic and company
- Revision status tracking (Not Started, In Progress, Revised)
- Confidence level rating (1-5)
- Notes for each question

**Task Management Features:**
- Priority levels (low, medium, high)
- Due date tracking
- Status management (pending, completed)
- Task descriptions

---

## 3. High-Level Architecture

```
[ React App ]
     |
     |------ REST API ------|
                            |
                   [ Node.js + Express ]
                            |
                      [ MongoDB ]
```

**Key Principle:** Separation of concerns with RESTful API design

---

## 4. Database Design (DB-First Approach)

### 4.1 Database
- **MongoDB Atlas** (Cloud) or Local MongoDB
- **ODM:** Mongoose

### 4.2 Collections

#### 4.2.1 users
```javascript
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string (unique)",
  "password": "string (hashed with bcrypt)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```
**Indexes:** 
- `email` (unique)

#### 4.2.2 studysessions
```javascript
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: User)",
  "subject": "string",
  "date": "Date",
  "startTime": "string",
  "endTime": "string",
  "dailyGoal": "string",
  "notes": "string",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```
**Indexes:**
- `userId`
- `date`

#### 4.2.3 interviewquestions
```javascript
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: User)",
  "question": "string",
  "topic": "string",
  "company": "string",
  "revisionStatus": "enum ['Not Started', 'In Progress', 'Revised']",
  "confidenceLevel": "number (1-5)",
  "notes": "string",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```
**Indexes:**
- `userId`
- `topic`

#### 4.2.4 tasks
```javascript
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: User)",
  "title": "string",
  "description": "string",
  "priority": "enum ['low', 'medium', 'high']",
  "dueDate": "Date",
  "status": "enum ['pending', 'completed']",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```
**Indexes:**
- `userId`
- `status`

---

## 5. Backend Design (Node.js + Express)

### 5.1 Technology Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt (Password Hashing)
- CORS

### 5.2 Backend Folder Structure
```
backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── studySessionController.js
│   │   ├── interviewQuestionController.js
│   │   ├── taskController.js
│   │   └── userController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── StudySession.js
│   │   ├── InterviewQuestion.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── studySessionRoutes.js
│   │   ├── interviewQuestionRoutes.js
│   │   ├── taskRoutes.js
│   │   └── userRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   └── utils/
├── server.js
├── .env
├── .env.example
├── package.json
└── .gitignore
```

### 5.3 Authentication Flow
1. User registers with name, email, and password
2. Password is hashed using bcrypt
3. User logs in with email and password
4. Backend validates credentials
5. JWT token is issued with user ID
6. Token is sent to frontend and stored
7. Protected routes verify JWT token via middleware

### 5.4 API Endpoints

#### Auth APIs
| Method | Endpoint                | Description          | Auth Required |
|--------|-------------------------|----------------------|---------------|
| POST   | /api/auth/register      | Register new user    | No            |
| POST   | /api/auth/login         | User login           | No            |
| POST   | /api/auth/forgot-password | Password recovery  | No            |
| GET    | /api/auth/me            | Get current user     | Yes           |

#### Study Session APIs
| Method | Endpoint              | Description              | Auth Required |
|--------|-----------------------|--------------------------|---------------|
| GET    | /api/sessions         | Get all user sessions    | Yes           |
| GET    | /api/sessions/:id     | Get session by ID        | Yes           |
| POST   | /api/sessions         | Create study session     | Yes           |
| PUT    | /api/sessions/:id     | Update study session     | Yes           |
| DELETE | /api/sessions/:id     | Delete study session     | Yes           |

#### Interview Question APIs
| Method | Endpoint              | Description              | Auth Required |
|--------|-----------------------|--------------------------|---------------|
| GET    | /api/questions        | Get all user questions   | Yes           |
| GET    | /api/questions/:id    | Get question by ID       | Yes           |
| POST   | /api/questions        | Create question          | Yes           |
| PUT    | /api/questions/:id    | Update question          | Yes           |
| DELETE | /api/questions/:id    | Delete question          | Yes           |

#### Task APIs
| Method | Endpoint              | Description              | Auth Required |
|--------|-----------------------|--------------------------|---------------|
| GET    | /api/tasks            | Get all user tasks       | Yes           |
| GET    | /api/tasks/:id        | Get task by ID           | Yes           |
| POST   | /api/tasks            | Create task              | Yes           |
| PUT    | /api/tasks/:id        | Update task              | Yes           |
| DELETE | /api/tasks/:id        | Delete task              | Yes           |

#### User APIs
| Method | Endpoint              | Description              | Auth Required |
|--------|-----------------------|--------------------------|---------------|
| GET    | /api/users/profile    | Get user profile         | Yes           |
| PUT    | /api/users/profile    | Update user profile      | Yes           |

### 5.5 Authorization
- Middleware validates JWT token
- User ID is extracted from token
- Users can only access their own data

---

## 6. Frontend Design (React)

### 6.1 Tech Stack
- React
- React Router
- Material-UI (MUI)
- Emotion (CSS-in-JS)
- Axios (HTTP Client)

### 6.2 Folder Structure
```
frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── SessionCard.js
│   │   ├── QuestionCard.js
│   │   ├── TaskCard.js
│   │   └── ProtectedRoute.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Dashboard.js
│   │   ├── StudySessions.js
│   │   ├── InterviewQuestions.js
│   │   ├── Tasks.js
│   │   └── Profile.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── index.js
│   └── config.js
├── .env
├── .env.example
├── package.json
└── .gitignore
```

### 6.3 Key Pages
- **Home:** Landing page with app overview
- **Login/Register:** User authentication
- **Dashboard:** Overview of all activities
- **Study Sessions:** Manage study sessions
- **Interview Questions:** Track interview preparation
- **Tasks:** Task management
- **Profile:** User profile management

---

## 7. Security Considerations

- **Password Security:** bcrypt hashing with salt rounds
- **JWT Authentication:** Secure token-based auth
- **Authorization:** Middleware protection for user data
- **Input Validation:** Server-side validation
- **CORS Configuration:** Controlled cross-origin access
- **Environment Variables:** Sensitive data in .env files

---

## 8. Setup Instructions

### 8.1 Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas account)
- Git

### 8.2 Backend Setup
```bash
cd backend
npm install

# Create .env file with your credentials
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Start development server
npm run dev

# Start production server
npm start
```

### 8.3 Frontend Setup
```bash
cd frontend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your backend API URL

# Start development server
npm start

# Build for production
npm run build
```

### 8.4 Database Setup
1. Create MongoDB Atlas account or install MongoDB locally
2. Create a new database named `preptrack`
3. Copy connection string to backend .env file
4. Collections will be created automatically on first use

---

## 9. Development Workflow

### 9.1 Recommended Practices
- Use meaningful variable and function names
- Write comments for complex logic
- Test API endpoints using Postman or Thunder Client
- Use Git for version control
- Follow REST API conventions
- Validate user input on both frontend and backend

### 9.2 Testing
- Test user registration and login
- Test CRUD operations for all resources
- Test authentication and authorization
- Test responsive design on different devices

---

## 10. Future Enhancements

- Calendar view for study sessions
- Progress tracking and analytics
- Reminder notifications
- Export data functionality
- Collaborative study groups
- Flashcard system for interview questions
- Pomodoro timer integration
- Dark mode support
- Mobile application
- Email notifications for task deadlines

---

## 11. Conclusion

PrepTrack demonstrates a complete full-stack MERN application with authentication, resource management, and user-specific data access. It serves as a practical learning project for understanding modern web development practices and building productivity tools.
