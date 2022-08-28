import { Button, Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { DOMAIN } from "../../utilities/utils";

import { ProjectDiv } from "./my-ticket-styles";
const MyTicket = () => {
  const darkGrey = `#696969`;
  const primaryColor = `#3399cc`;
  const [myTickets, setMyTickets] = useState();
  const [assignedTickets, setAssignedTickets] = useState();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const getUserData = async () => {
      const userData = await axios.get(
        `${DOMAIN.localhost}/api/v1/members/me`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setMyTickets(userData?.data?.member?.myTickets);
      setAssignedTickets(userData?.data?.member?.assignedTickets);
    };
    getUserData();
  }, [token]);

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card
            style={{
              backgroundColor: "#ffffff",
              color: "black",
              marginTop: "5rem",
              border: "none",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
          >
            <Card.Title
              style={{
                fontSize: "2.5rem",
                marginTop: "1rem",
                textAlign: "center",
                color: `${darkGrey}`,
              }}
            >
              {`My Tickets `}
            </Card.Title>
            <ProjectDiv style={{ backgroundColor: "#ffffff" }}>
              <Card.Title
                style={{
                  fontSize: "1.8rem",
                  color: `${darkGrey}`,
                }}
              >
                Title
              </Card.Title>
              <Card.Title
                style={{
                  fontSize: "1.8rem",
                  color: `${darkGrey}`,
                }}
              >
                Date created
              </Card.Title>
              <Card.Title
                style={{
                  fontSize: "1.8rem",
                  color: `${darkGrey}`,
                }}
              >
                Priority
              </Card.Title>
              <Card.Title
                style={{
                  fontSize: "1.8rem",
                  color: `${darkGrey}`,
                }}
              >
                Details
              </Card.Title>
            </ProjectDiv>
            {myTickets?.map((ticket) => {
              return (
                <ProjectDiv key={ticket._id}>
                  <h3 style={{ color: `${darkGrey}`, fontSize: "1.5rem" }}>
                    {ticket?.title}
                  </h3>
                  <h5 style={{ color: `${darkGrey}` }}>
                    {ticket?.createdAt.slice(0, 10)}
                  </h5>
                  <h5 style={{ color: `${darkGrey}` }}>{ticket?.priority}</h5>
                  <Link to={`/projects/1 1 1/${ticket.title}`}>
                    <Button
                      onClick={() => {
                        localStorage.setItem("ticketId", ticket._id);
                        localStorage.setItem("projectId", ticket.project);
                      }}
                      style={{ backgroundColor: `${primaryColor}` }}
                    >
                      Details
                    </Button>
                  </Link>
                </ProjectDiv>
              );
            })}
          </Card>
        </Col>
        <Col>
          <Card
            style={{
              backgroundColor: "#ffffff",
              color: "black",
              marginTop: "5rem",
              border: "none",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
          >
            <Card.Title
              style={{
                fontSize: "2.5rem",
                marginTop: "1rem",
                textAlign: "center",
                color: `${darkGrey}`,
              }}
            >
              {`Assigned Tickets `}
            </Card.Title>
            <ProjectDiv style={{ backgroundColor: "#ffffff" }}>
              <Card.Title
                style={{
                  fontSize: "1.8rem",
                  color: `${darkGrey}`,
                }}
              >
                Title
              </Card.Title>
              <Card.Title
                style={{
                  fontSize: "1.8rem",
                  color: `${darkGrey}`,
                }}
              >
                Date created
              </Card.Title>
              <Card.Title
                style={{
                  fontSize: "1.8rem",
                  color: `${darkGrey}`,
                }}
              >
                Priority
              </Card.Title>
              <Card.Title
                style={{
                  fontSize: "1.8rem",
                  color: `${darkGrey}`,
                }}
              >
                Details
              </Card.Title>
            </ProjectDiv>
            {assignedTickets?.map((ticket) => {
              return (
                <ProjectDiv key={ticket._id}>
                  <h3 style={{ color: `${darkGrey}`, fontSize: "1.5rem" }}>
                    {ticket?.title}
                  </h3>
                  <h5 style={{ color: `${darkGrey}` }}>
                    {ticket?.createdAt.slice(0, 10)}
                  </h5>
                  <h5 style={{ color: `${darkGrey}` }}>{ticket?.priority}</h5>
                  <Link to={`/projects/1 1 1/${ticket.title}`}>
                    <Button
                      onClick={() => {
                        localStorage.setItem("ticketId", ticket._id);
                        localStorage.setItem("projectId", ticket.project);
                      }}
                      style={{ backgroundColor: `${primaryColor}` }}
                    >
                      Details
                    </Button>
                  </Link>
                </ProjectDiv>
              );
            })}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default MyTicket;
