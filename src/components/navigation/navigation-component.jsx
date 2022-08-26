import { FaBug } from "react-icons/fa";
import {
  NavContainer,
  LinksContainer,
  Links,
  LogoContainer,
} from "./navigation.styles";
export const Navigation = () => {
  const logoutHandler = () => {
    localStorage.removeItem("token");
  };

  return (
    <NavContainer>
      <LogoContainer>
        <Links to={"/"}>{<FaBug />}</Links>
      </LogoContainer>
      <div>
        <LinksContainer as={"ul"}>
          <Links to={"/projects"}>PROJECTS</Links>

          <Links to={"/tickets"}>TICKETS</Links>

          <Links to={"/profile"}>PROFILE</Links>
          <Links to={"/login"} onClick={logoutHandler}>
            Logout
          </Links>
        </LinksContainer>
      </div>
    </NavContainer>
  );
};

export default Navigation;
