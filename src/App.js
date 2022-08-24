import "./App.css";
import Home from "./components/home/home-component";
import Login from "./components/login/login-component";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./route/protected-Route";
import Ticket from "./components/tickets/ticket-component";
import Project from "./components/project-route/project-route";
import SingleProject from "./components/single-project/single-project-component";
import SignUp from "./components/sign-up/sign-up.component";
import Navigation from "./components/navigation/navigation-component";
function App() {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Navigation />
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/:projectName"
        element={
          <ProtectedRoute>
            <Navigation />
            <SingleProject />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <Navigation />
            <Project />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
