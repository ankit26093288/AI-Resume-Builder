import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ResumeForm from "./pages/ResumeForm";
import MyResumes from "./pages/MyResumes";
function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>    <Route
  path="/resume"
  element={
    <ProtectedRoute>
      <ResumeForm />
    </ProtectedRoute>
  }
/>
<Route
  path="/my-resumes"
  element={
    <ProtectedRoute>
      <MyResumes />
    </ProtectedRoute>
  }
/>
<Route
  path="/edit-resume/:id"
  element={
    <ProtectedRoute>
      <ResumeForm />
    </ProtectedRoute>
  }
/>

  </Routes>

    </BrowserRouter>
  );
}

export default App;