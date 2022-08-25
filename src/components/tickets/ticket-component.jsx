import {
  Button,
  Container,
  Form,
  Row,
  Col,
  Card,
  FormControl,
} from "react-bootstrap";
import { ProjectDiv } from "./ticket-styles";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { DOMAIN } from "../../utilities/utils";
import axios from "axios";
import { Link } from "react-router-dom";
const Ticket = () => {
  const ticketId = localStorage.getItem("ticketId");
  const projectId = localStorage.getItem("projectId");
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const darkGrey = `#696969`;
  const primaryColor = `#3399cc`;
  const lightGrey = `	#F5F5F5`;
  const [ticketData, setTicket] = useState();
  const [comment, setComment] = useState();
  const [title, setTitle] = useState();
  const [feature, setFeature] = useState();
  const [type, setType] = useState();
  const [browser, setBrowser] = useState();
  const [operatingSystem, setOperatingSystem] = useState();
  const [foundIn, setFoundIn] = useState();
  const [priority, setPriority] = useState();

  const [description, setDescription] = useState();

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
  useEffect(() => {
    const getTicketDate = async () => {
      const ticket = await axios.get(
        `${DOMAIN.localhost}/api/v1/projects/${projectId}/tickets/${ticketId}`,
        { headers: { authorization: `Bearer ${token}` } }
      );
      setTicket(ticket?.data?.ticket);
    };
    getTicketDate();
  }, [token, projectId, ticketId]);

  const getComment = (e) => {
    setComment(e.target.value);
  };

  const onSubmitComment = async () => {
    await axios.post(
      `${DOMAIN.localhost}/api/v1/projects/${projectId}/tickets/${ticketId}/comments`,
      { comment },
      { headers: { authorization: `Bearer ${token}` } }
    );
  };
  console.log({
    title,
    type,
    feature,
    browser,
    operatingSystem,
    foundIn,
    priority,
    description,
  });
  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <Card
              style={{
                backgroundColor: "#f5f5f5",
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
                TICKET DETAILS
              </Card.Title>

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
                    PROPERTIES
                  </Card.Title>
                  <Row
                    style={{
                      fontSize: "2.5rem",
                      borderBottom: "1px solid grey",
                      marginTop: "1.5rem",
                    }}
                  >
                    <Col
                      style={{
                        fontSize: "2rem",
                      }}
                    >
                      TYPE:
                    </Col>
                    <Col
                      style={{
                        fontSize: "2rem",
                      }}
                    >
                      {ticketData?.type}
                    </Col>
                  </Row>
                  <Row
                    style={{
                      fontSize: "2.5rem",
                      borderBottom: "1px solid grey",
                      marginTop: "1.5rem",
                    }}
                  >
                    <Col
                      style={{
                        fontSize: "2rem",
                      }}
                    >
                      PRIORITY:
                    </Col>
                    <Col
                      style={{
                        fontSize: "2rem",
                      }}
                    >
                      {ticketData?.priority}
                    </Col>
                  </Row>
                  <Row
                    style={{
                      fontSize: "2.5rem",
                      borderBottom: "1px solid grey",
                      marginTop: "1.5rem",
                    }}
                  >
                    <Col
                      style={{
                        fontSize: "2rem",
                      }}
                    >
                      STATUS:
                    </Col>
                    <Col
                      style={{
                        fontSize: "2rem",
                      }}
                    >
                      {ticketData?.status}
                    </Col>
                  </Row>
                  <Row
                    style={{
                      fontSize: "2.5rem",
                      borderBottom: "1px solid grey",
                      marginTop: "1.5rem",
                    }}
                  >
                    <Col
                      style={{
                        fontSize: "2rem",
                      }}
                    >
                      CREATED BY:
                    </Col>
                    <Col
                      style={{
                        fontSize: "2rem",
                      }}
                    >
                      {ticketData?.createdBy?.name?.split(" ")[0]}
                    </Col>
                  </Row>
                  <Row
                    style={{
                      fontSize: "2.5rem",
                      borderBottom: "1px solid grey",
                      marginTop: "1.5rem",
                    }}
                  >
                    <Col
                      style={{
                        fontSize: "2rem",
                      }}
                    >
                      DATE:
                    </Col>
                    <Col
                      style={{
                        fontSize: "2rem",
                      }}
                    >
                      {ticketData?.createdAt.slice(0, 10)}
                    </Col>
                  </Row>
                  <Row
                    style={{
                      fontSize: "2.5rem",
                      borderBottom: "1px solid grey",
                      marginTop: "1.5rem",
                    }}
                  >
                    <Col
                      style={{
                        fontSize: "2rem",
                      }}
                    >
                      FOUND IN:
                    </Col>
                    <Col
                      style={{
                        fontSize: "2rem",
                      }}
                    >
                      {ticketData?.foundIn}
                    </Col>
                  </Row>
                  <Row
                    style={{
                      fontSize: "2.5rem",
                      borderBottom: "1px solid grey",
                      marginTop: "1.5rem",
                    }}
                  >
                    <Col
                      style={{
                        fontSize: "2rem",
                      }}
                    >
                      ASSIGNED TO:
                    </Col>
                    <Col
                      style={{
                        fontSize: "2rem",
                      }}
                    >
                      {ticketData?.assignedTo[0]
                        ? ticketData?.assignedTo?.map((Obj) => (
                            <Row>{Obj.name.split(" ")[0]}</Row>
                          ))
                        : "none"}
                    </Col>
                  </Row>
                  <Row
                    style={{
                      fontSize: "2.5rem",
                      borderBottom: "1px solid grey",
                      marginTop: "1.5rem",
                    }}
                  >
                    <Col
                      style={{
                        fontSize: "2rem",
                      }}
                    >
                      DESCRIPTION:
                    </Col>
                    <Col
                      style={{
                        fontSize: "1rem",
                      }}
                    >
                      {ticketData?.description}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Card>
          </Col>

          <Col>
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
                    style={{
                      color: `${darkGrey}`,
                      fontSize: "2rem",
                      borderBottom: "1px solid grey",
                      marginBottom: "2rem",
                    }}
                  >
                    COMMENTS
                  </Card.Title>
                  {ticketData?.comments[0] ? (
                    ticketData?.comments?.map((commentObj) => (
                      <Row
                        key={commentObj._id}
                        style={{
                          fontSize: "1.5rem",
                          color: `${darkGrey}`,
                          marginBottom: "2rem",
                        }}
                      >
                        <Col sm={3}>
                          By {commentObj.member.name.split(" ")[0]}::
                        </Col>
                        <Col sm={9}>{commentObj.comment}</Col>
                      </Row>
                    ))
                  ) : (
                    <Row
                      style={{
                        fontSize: "1.5rem",
                        color: `${darkGrey}`,
                        marginBottom: "2rem",
                      }}
                    >
                      No Comments
                    </Row>
                  )}
                  <Form>
                    <fieldset>
                      <Form.Group className="mb-3">
                        <Form.Label
                          htmlFor="descriptionInput"
                          style={{ fontSize: "2rem" }}
                        >
                          Add Your Comment
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          row={3}
                          id="descriptionInput"
                          placeholder={"Comment"}
                          onChange={getComment}
                        />
                      </Form.Group>
                      <Button
                        type="submit"
                        style={{ backgroundColor: `${primaryColor}` }}
                        onClick={onSubmitComment}
                      >
                        Submit
                      </Button>
                    </fieldset>
                  </Form>
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
                      // onClick={onSubmitHandler}
                    >
                      Submit
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Row>
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

export default Ticket;
