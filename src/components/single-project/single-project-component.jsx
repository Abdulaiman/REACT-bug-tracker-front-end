import { Button, Container, Form, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProjectDiv } from "./single-project-styles";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { projectSelector } from "../../store/selectors/redux-selectors.";
import { useDispatch } from "react-redux";
import axios from "axios";
import { DOMAIN } from "../../utilities/utils";
const SingleProject = () => {
  const [project, setProject] = useState();
  const dispatch = useDispatch();
  const darkGrey = `#696969`;
  const primaryColor = `#3399cc`;
  const lightGrey = `	#F5F5F5`;
  const projectId = localStorage.getItem("projectId");
  console.log(projectId);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getProjectDetails = async () => {
      const projectDetails = await axios.get(
        `${DOMAIN.localhost}/api/v1/projects/${projectId}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      console.log(projectDetails);
      setProject(projectDetails);
    };
    getProjectDetails();
  }, [projectId]);
  return (
    <div style={{ backgroundColor: `${lightGrey}` }}>
      <Container fluid>
        <Row>
          <Col sm={4}>
            <Row>
              <Card
                style={{
                  color: "darkGrey",
                  marginTop: "5rem",
                  border: "none",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }}
              >
                <Card.Body style={{ color: `${darkGrey}` }}>
                  <Card.Title
                    style={{
                      fontSize: "2rem",
                      borderBottom: "1px solid grey",
                    }}
                  >
                    PROJECT INFO
                  </Card.Title>
                  <Row
                    style={{
                      fontSize: "4rem",
                      borderBottom: "1px solid grey",
                    }}
                  >
                    <Col
                      style={{
                        fontSize: "3rem",
                      }}
                    >
                      Name:
                    </Col>
                    <Col
                      style={{
                        fontSize: "1.5rem",
                      }}
                    >
                      {project?.data.project.name.toUpperCase()}
                    </Col>
                  </Row>
                  <Row
                    style={{
                      fontSize: "4rem",
                    }}
                  >
                    <Col
                      style={{
                        fontSize: "3rem",
                      }}
                    >
                      Description:
                    </Col>
                    <Col
                      style={{
                        fontSize: "1rem",
                      }}
                    >
                      {project?.data.project.description}
                    </Col>
                  </Row>

                  {/* <ProjectDiv
                    style={{
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  ></ProjectDiv> */}
                </Card.Body>
              </Card>
            </Row>
            <Row>
              <Card
                style={{
                  color: "darkGrey",
                  marginTop: "5rem",
                  border: "none",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }}
              >
                <Card.Body>
                  <Card.Title
                    style={{ color: `${darkGrey}`, fontSize: "2rem" }}
                  >
                    CREATE A NEW TICKET
                  </Card.Title>
                  <Form>
                    <fieldset>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="titleInput">Title</Form.Label>
                        <Form.Control
                          id="titleInput"
                          placeholder="title"
                          // onChange={getName}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="descriptionInput">
                          Description
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          row={3}
                          id="descriptionInput"
                          placeholder={"Description"}
                          // onChange={getDescription}
                        />
                        {/* <Form.Group>
                        <Form.Label htmlFor={"developers"}>
                          developers
                        </Form.Label>
                        <Form.Select id="disabledSelect" onChange={getTitle}>
                          <option>Disabled select</option>
                          <option>Disabled select</option>
                          <option>Disabled select</option>
                        </Form.Select>
                      </Form.Group> */}
                      </Form.Group>
                      <Button
                        type="submit"
                        style={{ backgroundColor: `${primaryColor}` }}
                        // onClick={onSubmitHandler}
                      >
                        Submit
                      </Button>
                    </fieldset>
                  </Form>
                </Card.Body>
              </Card>
            </Row>
          </Col>
          <Col sm={8}>
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
                {`ALL TICKETS (${project?.data?.project?.tickets.length})`}
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
              {project?.data?.project.tickets?.map((project) => {
                return (
                  <ProjectDiv key={project._id}>
                    <h3 style={{ color: `${darkGrey}`, fontSize: "1.5rem" }}>
                      {project?.title}
                    </h3>
                    <h5 style={{ color: `${darkGrey}` }}>
                      {project?.createdAt.slice(0, 10)}
                    </h5>
                    <h5 style={{ color: `${darkGrey}` }}>
                      {project?.priority}
                    </h5>
                    <Link to={`/projects/${project.title}`}>
                      <Button
                        onClick={() => {
                          localStorage.setItem("projectId", project._id);
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
        <Row>
          <Col></Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default SingleProject;
