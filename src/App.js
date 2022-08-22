import "./App.css";
import Home from "./components/home-component";
import Login from "./components/tickets-component";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./route/protected-Route";
import Project from "./components/project-route/project-route";

import Ticket from "./components/tickets/ticket-component";
function App() {
  return (
    <Routes>
      <Route path="/ticket" element={<Ticket />} />
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
