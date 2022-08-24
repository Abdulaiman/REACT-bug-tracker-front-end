import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProjectDiv } from "./project.styles";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DOMAIN } from "../../utilities/utils";
import { setCurrentProject } from "../../store/redux-slices/project-slice";
import axios from "axios";
import { Link } from "react-router-dom";
const darkGrey = `#696969`;
const primaryColor = `#3399cc`;
const Project = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [projects, setProjects] = useState();

  useEffect(() => {
    const getProjects = async () => {
      const token = localStorage.getItem("token");
      const data = await axios.get(`${DOMAIN.localhost}/api/v1/projects`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setProjects(data.data.payload);
    };
    getProjects();
  }, []);

  const getName = (e) => {
    setName(e.target.value);
  };

  const getDescription = (e) => {
    setDescription(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const data = await axios.post(
        `${DOMAIN.localhost}/api/v1/projects`,
        {
          name,
          description,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setProjects(data.data.payload);
    } catch (err) {
      alert(err);
    }
  };

  // const viewProjectsDetails = e;
  console.log(name, description);
  console.log(projects);
  return (
    <div
      style={{
        // backgroundColor: `${darkGrey2}`,
        height: "100vh",
        width: "100vw",
      }}
    >
      <Container>
        <Row>
          <Col sm={8}>
            <Card
              style={{
                backgroundColor: "#ffffff",
                color: "black",
                marginTop: "5rem",
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
                AVAILABLE PROJECTS
              </Card.Title>
              <ProjectDiv style={{ backgroundColor: "#ffffff" }}>
                <Card.Title
                  style={{
                    fontSize: "1.8rem",
                    color: `${darkGrey}`,
                  }}
                >
                  project name
                </Card.Title>
                <Card.Title
                  style={{
                    fontSize: "1.8rem",
                    color: `${darkGrey}`,
                  }}
                >
                  project date
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
              {projects?.map((project) => {
                return (
                  <ProjectDiv key={project._id}>
                    <h3 style={{ color: `${darkGrey}`, fontSize: "1.5rem" }}>
                      {project?.name}
                    </h3>
                    <h5 style={{ color: `${darkGrey}` }}>
                      {project?.createdAt.slice(0, 10)}
                    </h5>
                    <Link to={`/projects/${project.name}`}>
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
          {user.data.role === "admin" ? (
            <Col sm={4}>
              <Card style={{ color: "darkGrey", marginTop: "5rem" }}>
                <Card.Body>
                  <Card.Title
                    style={{ color: `${darkGrey}`, fontSize: "2rem" }}
                  >
                    CREATE A NEW PROJECT
                  </Card.Title>
                  <Form>
                    <fieldset>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="titleInput">Title</Form.Label>
                        <Form.Control
                          id="titleInput"
                          placeholder="title"
                          onChange={getName}
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
                          onChange={getDescription}
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
                        onClick={onSubmitHandler}
                      >
                        Submit
                      </Button>
                    </fieldset>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          ) : (
            ""
          )}
        </Row>
        <Row>
          <Col></Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Project;
