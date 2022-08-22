import "./App.css";
import Home from "./components/project-route/home-component";
import Login from "./components/login/login-component";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./route/protected-Route";
import Project from "./components/project-route";
import Ticket from "./components/tickets/ticket-component";
import SignUp from "./components/sign-up/sign-up.component";
function App() {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <Project />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
