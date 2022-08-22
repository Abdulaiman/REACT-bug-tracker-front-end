import { Link } from "react-router-dom";

const Home = () => {
  const logoutHandler = () => {
    localStorage.removeItem("token");
  };
  return (
    <div>
      <h1>hello from the home page</h1>
      <Link to="/projects">Projects</Link>
      <Link to="/login" onClick={logoutHandler}>
        logout
      </Link>
    </div>
  );
};

export default Home;
