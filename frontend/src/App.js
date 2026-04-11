import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from './pages/Dashboard';
import Questions from "./pages/Questions";
import ProtectedRoute from "./components/ProtectedRoute";
import StudySessions from "./pages/StudySessions";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";


function App() {
  return (
    <Router>
      <Navbar />   {/* ✅ ONLY HERE */}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/questions"
          element={
            <ProtectedRoute>
              <Questions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sessions"
          element={
            <ProtectedRoute>
              <StudySessions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;