import {
  Button,
  Container,
  Form,
  Row,
  Col,
  Card,
  FormControl,
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { DOMAIN } from "../../utilities/utils";
import { useParams } from "react-router";
import axios from "axios";
const Ticket = () => {
  const params = useParams();
  const ticketId = localStorage.getItem("ticketId");
  const projectId = localStorage.getItem("projectId");
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const darkGrey = `#696969`;
  const primaryColor = `#3399cc`;
  const [ticketData, setTicket] = useState();
  const [comment, setComment] = useState();
  const [title, setTitle] = useState();
  const [feature, setFeature] = useState();
  const [type, setType] = useState();
  const [browser, setBrowser] = useState();
  const [operatingSystem, setOperatingSystem] = useState();
  const [foundIn, setFoundIn] = useState();
  const [priority, setPriority] = useState();
  const [member1, setMember1] = useState();
  const [member2, setMember2] = useState();
  const [member3, setMember3] = useState();
  const [members, setMembers] = useState();
  const [status, setStatus] = useState();
  const [statusAdmin, setStatusAdmin] = useState();
  const [description, setDescription] = useState();
  const [show, setShow] = useState(false);

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
  const onChangeAssign1 = (e) => {
    setMember1(e.target.value);
  };
  const onChangeAssign2 = (e) => {
    setMember2(e.target.value);
  };
  const onChangeAssign3 = (e) => {
    setMember3(e.target.value);
  };
  const onUpdateTicketStatus = (e) => {
    setStatus(e.target.value);
  };
  const onStatusChange = (e) => {
    setStatusAdmin(e.target.value);
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

  useEffect(() => {
    const getAllMembers = async () => {
      if (user.data.role === "admin") {
        const allMembers = await axios.get(
          `${DOMAIN.localhost}/api/v1/members`,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        setMembers(allMembers?.data?.data);
      } else return;
    };
    getAllMembers();
  }, [token, user.data.role]);

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
  const onEditTicket = async () => {
    await axios.patch(
      `${DOMAIN.localhost}/api/v1/tickets/${ticketId}/update-ticket`,
      {
        type,
        feature,
        browser,
        operatingSystem,
        foundIn,
        priority,
        description,
        status: statusAdmin,
        title,
      },
      { headers: { authorization: `Bearer ${token}` } }
    );
    window.location.reload();
  };
  const onAssignDevelopers = async (e) => {
    await axios.patch(
      `${DOMAIN.localhost}/api/v1/projects/${projectId}/tickets/${ticketId}`,
      {
        assigneTo: [
          member1?.split(" ")[2],
          member2?.split(" ")[2],
          member3?.split(" ")[2],
        ],
      },
      { headers: { authorization: `Bearer ${token}` } }
    );
  };

  const onUpdateStatus = async () => {
    await axios.patch(
      `${DOMAIN.localhost}/api/v1/tickets/${ticketId}/update-ticket-status`,
      {
        status,
      },
      { headers: { authorization: `Bearer ${token}` } }
    );
  };

  return (
    <div>
      <Container
        style={{
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
        fluid
      >
        <Row>
          <Col>
            <Row>
              <Card
                style={{
                  // backgroundColor: "#f5f5f5",
                  minHeight: "100vh",
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
                        TITLE:
                      </Col>
                      <Col
                        style={{
                          fontSize: "2rem",
                        }}
                      >
                        {ticketData?.title}
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
            </Row>
            <Row>
              {user.data.role === "admin" ? (
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
                      ASSIGN MEMBERS
                    </Card.Title>
                    <Form>
                      <Form.Group>
                        <Form.Label htmlFor={"assignDeveloper"}>
                          Assign-1
                        </Form.Label>
                        <Form.Select
                          id="assignDeveloper"
                          onChange={onChangeAssign1}
                        >
                          <option key={3}>select</option>
                          {members?.map((member) => (
                            <option key={member?._id}>{`Name:${
                              member?.name?.split(" ")[0]
                            } Id: ${member?._id}`}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor={"assignDeveloper"}>
                          Assign-2
                        </Form.Label>
                        <Form.Select
                          id="assignDeveloper"
                          onChange={onChangeAssign2}
                        >
                          <option key={3}>select</option>
                          {members?.map((member) => (
                            <option key={member?._id}>{`Name:${
                              member?.name?.split(" ")[0]
                            } Id: ${member?._id}`}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor={"assignDeveloper"}>
                          Assign-3
                        </Form.Label>
                        <Form.Select
                          id="assignDeveloper"
                          onChange={onChangeAssign3}
                        >
                          <option key={3}>select</option>
                          {members?.map((member) => (
                            <option key={member?._id}>{`Name:${
                              member?.name?.split(" ")[0]
                            } Id: ${member?._id}`}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                      <Button
                        type="submit"
                        style={{ backgroundColor: `${primaryColor}` }}
                        onClick={onAssignDevelopers}
                      >
                        Submit
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              ) : (
                ""
              )}
            </Row>
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
            <Row style={{ marginTop: "3rem" }}>
              {user.data.role === "admin" ? (
                <>
                  <Button onClick={() => setShow(true)}>UPDATE TICKET</Button>
                  <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title>Ticket</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                            UPDATE TICKET
                          </Card.Title>
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label htmlFor="titleInput">
                                Title
                              </Form.Label>
                              <Form.Control
                                id="titleInput"
                                placeholder="title"
                                onChange={onTitleChangeHandler}
                              />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label htmlFor={"featureInput"}>
                                feature
                              </Form.Label>
                              <FormControl
                                id="featureInput"
                                placeholder="feature"
                                onChange={onFeatureChangeHandler}
                              />
                            </Form.Group>

                            <Form.Group>
                              <Form.Label htmlFor={"typeOfBug"}>
                                type
                              </Form.Label>
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
                              <Form.Label htmlFor={"typeOfBrowser"}>
                                Browser
                              </Form.Label>
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
                              <Form.Label htmlFor={"typeOfStatus"}>
                                Status
                              </Form.Label>
                              <Form.Select
                                id="typeOfStatus"
                                onChange={onStatusChange}
                              >
                                <option>select</option>
                                <option>fixed</option>
                                <option>in progress</option>
                                <option>waiting</option>
                                <option>cancelled</option>
                              </Form.Select>
                            </Form.Group>
                            <Form.Group>
                              <Form.Label htmlFor={"findIn"}>
                                Found in
                              </Form.Label>
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
                          </Form>
                        </Card.Body>
                      </Card>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        varient={"secondary"}
                        onClick={() => setShow(false)}
                      >
                        close
                      </Button>
                      <Button
                        type="submit"
                        style={{ backgroundColor: `${primaryColor}` }}
                        onClick={onEditTicket}
                      >
                        Submit
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              ) : (
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
                      UPDATE TICKET STATUS
                    </Card.Title>
                    <Form>
                      <fieldset
                        disabled={params.projectName === "1 1 1" ? false : true}
                      >
                        <Form.Group>
                          <Form.Label htmlFor={"updateStatus"}>
                            Update Status
                          </Form.Label>
                          <Form.Select
                            id="assignDeveloper"
                            onChange={onUpdateTicketStatus}
                          >
                            <option key={1}>select</option>
                            <option key={2}>waiting</option>
                            <option key={3}>in progress</option>
                            <option key={4}>fixed</option>
                            <option key={5}>cancelled</option>
                          </Form.Select>
                        </Form.Group>
                        <Button
                          type="submit"
                          style={{ backgroundColor: `${primaryColor}` }}
                          onClick={onUpdateStatus}
                        >
                          Submit
                        </Button>
                      </fieldset>
                    </Form>
                  </Card.Body>
                </Card>
              )}
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
