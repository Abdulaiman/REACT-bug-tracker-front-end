import {
  Button,
  Container,
  Form,
  Row,
  Col,
  Card,
  FormControl,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProjectDiv } from "./single-project-styles";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { projectSelector } from "../../store/selectors/redux-selectors.";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DOMAIN } from "../../utilities/utils";
const SingleProject = () => {
  const [tickets, setTickets] = useState();
  const [project, setProject] = useState();
  const [title, setTitle] = useState();
  const [feature, setFeature] = useState();
  const [type, setType] = useState();
  const [browser, setBrowser] = useState();
  const [operatingSystem, setOperatingSystem] = useState();
  const [foundIn, setFoundIn] = useState();
  const [priority, setPriority] = useState();

  const [description, setDescription] = useState();
  const [newName, setNewName] = useState();
  const [newDescription, setNewDescription] = useState();
  const user = JSON.parse(localStorage.getItem("user"));
  const onTitleChangeHandler = (e) => {
    setTitle(e.target.value);
  };
  const onFeatureChangeHandler = (e) => {
    setFeature(e.target.value);
  };
  const onTypeChangeHandler = (e) => {
    setType(e.target.value);
  };
  const onBrowserChangeHandler = (e) => {
    setBrowser(e.target.value);
  };
  const onOperatingSystemChangeHandler = (e) => {
    setOperatingSystem(e.target.value);
  };
  const onFoundInChangeHandler = (e) => {
    setFoundIn(e.target.value);
  };
  const onPriorityChangeHandler = (e) => {
    setPriority(e.target.value);
  };
  const onDescriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  };
  const onNewNameChange = (e) => {
    setNewName(e.target.value);
  };
  const onNewDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };
  const navigate = useNavigate();

  // console.log({
  //   title,
  //   type,
  //   feature,
  //   browser,
  //   operatingSystem,
  //   foundIn,
  //   priority,
  //   description,
  // });
  const darkGrey = `#696969`;
  const primaryColor = `#3399cc`;
  const lightGrey = `	#F5F5F5`;
  const projectId = localStorage.getItem("projectId");
  const token = localStorage.getItem("token");
  useEffect(() => {
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
  }, [projectId, token]);

  const onSubmitHandler = async () => {
    const tickets = await axios.post(
      `${DOMAIN.localhost}/api/v1/projects/${projectId}/tickets`,
      {
        type,
        feature,
        browser,
        operatingSystem,
        foundIn,
        priority,
        description,
      },
      { headers: { authorization: `Bearer ${token}` } }
    );
    console.log(tickets);
    setTickets(tickets);
  };
  const onSubmitEditProjectHandler = async () => {
    const updatedProject = await axios.patch(
      `${DOMAIN.localhost}/api/v1/projects/${projectId}`,
      {
        name: newName,
        description: newDescription,
      },
      { headers: { authorization: `Bearer ${token}` } }
    );
    console.log(updatedProject);
  };
  const onDeleteHandler = async (e) => {
    e.preventDefault();
    navigate(-1);
    await axios.delete(`${DOMAIN.localhost}/api/v1/projects/${projectId}`, {
      headers: { authorization: `Bearer ${token}` },
    });
  };
  // console.log({
  //   title,
  //   type,
  //   feature,
  //   browser,
  //   operatingSystem,
  //   foundIn,
  //   priority,
  //   description,
  // });
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
                      CreatedAt:
                    </Col>
                    <Col
                      style={{
                        fontSize: "2rem",
                      }}
                    >
                      {project?.data?.project?.createdAt.slice(0, 10)}
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

                  {user.data.role === "admin" ? (
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="changeProjectName">
                          Edit name
                        </Form.Label>
                        <Form.Control
                          placeholder="new name"
                          id={"changeProjectName"}
                          onChange={onNewNameChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="changeProject description">
                          Edit description
                        </Form.Label>
                        <Form.Control
                          placeholder="new description"
                          id={"changeProject description"}
                          onChange={onNewDescriptionChange}
                        />
                      </Form.Group>
                      <Button
                        type={"submit"}
                        style={{ backgroundColor: `${primaryColor}` }}
                        onClick={onSubmitEditProjectHandler}
                      >
                        EDIT PROJECT
                      </Button>
                      <ProjectDiv
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          type={"submit"}
                          onClick={onDeleteHandler}
                          style={{
                            backgroundColor: "red",
                            border: "none",
                            fontSize: "1.5rem",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          DELETE PROJECT
                        </Button>
                      </ProjectDiv>
                    </Form>
                  ) : (
                    ""
                  )}
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
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="titleInput">Title</Form.Label>
                      <Form.Control
                        id="titleInput"
                        placeholder="title"
                        onChange={onTitleChangeHandler}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor={"featureInput"}>feature</Form.Label>
                      <FormControl
                        id="featureInput"
                        placeholder="feature"
                        onChange={onFeatureChangeHandler}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label htmlFor={"typeOfBug"}>type</Form.Label>
                      <Form.Select
                        id="typeOfBug"
                        onChange={onTypeChangeHandler}
                      >
                        <option>select</option>
                        <option>bug</option>
                        <option>feature request</option>
                        <option>others</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label htmlFor={"typeOfBrowser"}>Browser</Form.Label>
                      <Form.Select
                        id="typeOfBrowser"
                        onChange={onBrowserChangeHandler}
                      >
                        <option>select</option>
                        <option>chrome</option>
                        <option>firefox</option>
                        <option>safari</option>
                        <option>internet explorer</option>
                        <option>microsoft edge</option>
                        <option>opera</option>
                        <option>mobile</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label htmlFor={"typeOfOperatingSyster"}>
                        Operating system
                      </Form.Label>
                      <Form.Select
                        id="typeOfOperatingSyster"
                        onChange={onOperatingSystemChangeHandler}
                      >
                        <option>select</option>
                        <option>mac Os</option>
                        <option>linux</option>
                        <option>windows</option>
                        <option>mobile: Android</option>
                        <option>mobile: Ios</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label htmlFor={"findIn"}>Found in</Form.Label>
                      <Form.Select
                        id="findIn"
                        onChange={onFoundInChangeHandler}
                      >
                        <option>select</option>
                        <option>Production</option>
                        <option>development</option>
                        <option>testing</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label htmlFor={"typeOfPriotity"}>
                        priority
                      </Form.Label>
                      <Form.Select
                        id="typeOfPriotity"
                        onChange={onPriorityChangeHandler}
                      >
                        <option>select</option>
                        <option>medium</option>
                        <option>high</option>
                        <option>critical</option>
                        <option>critical high-priority</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="descriptionInput">
                        Description
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        row={4}
                        id="descriptionInput"
                        placeholder={"Description"}
                        onChange={onDescriptionChangeHandler}
                      />
                    </Form.Group>
                    <Button
                      type="submit"
                      style={{ backgroundColor: `${primaryColor}` }}
                      onClick={onSubmitHandler}
                    >
                      Submit
                    </Button>
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
                {`ALL TICKETS (${
                  project?.data?.project?.tickets?.length || 0
                })`}
              </Card.Title>
              <ProjectDiv style={{ backgroundColor: "#ffffff" }}>
                <Card.Title
                  style={{
                    fontSize: "1.8rem",
                    color: `${darkGrey}`,
                  }}
                >
                  Type
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
              {project?.data?.project.tickets?.map((ticket) => {
                return (
                  <ProjectDiv key={ticket._id}>
                    <h3 style={{ color: `${darkGrey}`, fontSize: "1.5rem" }}>
                      {ticket?.type}
                    </h3>
                    <h5 style={{ color: `${darkGrey}` }}>
                      {ticket?.createdAt.slice(0, 10)}
                    </h5>
                    <h5 style={{ color: `${darkGrey}` }}>{ticket?.priority}</h5>
                    <Link
                      to={`/projects/${project?.data?.project?.name}/${ticket.title}`}
                    >
                      <Button
                        onClick={() => {
                          localStorage.setItem("ticketId", ticket._id);
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
