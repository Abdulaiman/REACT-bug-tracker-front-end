import { FaBug } from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";
import {
  NavContainer,
  LinksContainer,
  Links,
  LogoContainer,
} from "./navigation.styles";
export const Navigation = () => {
  const logoutHandler = () => {
    localStorage.clear();
  };

  return (
    <NavContainer fluid as={Container}>
      <Row as={NavContainer}>
        <Col>
          <LogoContainer>
            <Links to={"/"}>{<FaBug />}</Links>
          </LogoContainer>
        </Col>
        <Col as={LinksContainer}>
          <Row>
            <Col>
              <Links to={"/projects"}>PROJECTS</Links>
            </Col>
            <Col>
              <Links to={"/tickets"}>TICKETS</Links>
            </Col>
            <Col>
              <Links to={"/profile"}>PROFILE</Links>
            </Col>
            <Col>
              <Links to={"/login"} onClick={logoutHandler}>
                Logout
              </Links>
            </Col>
          </Row>
        </Col>
      </Row>
    </NavContainer>
  );
};

export default Navigation;
