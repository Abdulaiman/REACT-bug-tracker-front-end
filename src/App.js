import "./App.css";
import Home from "./components/home/home-component";
import Login from "./components/login/login-component";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./route/protected-Route";
import Project from "./components/project-route";
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
