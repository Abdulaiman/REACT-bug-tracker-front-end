import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { projectSelector } from "../../store/selectors/redux-selectors.";
const Ticket = () => {
  const projectId = useSelector(projectSelector);
  console.log(projectId);
  return (
    <div>
      <h1>hello from the Ticket page</h1>
      <Link to="/">home</Link>
    </div>
  );
};

export default Ticket;
