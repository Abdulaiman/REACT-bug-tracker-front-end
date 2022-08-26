import { Button, Container, Form, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ProjectDiv } from "./profile-styles";
import { DOMAIN } from "../../utilities/utils";
const Profile = () => {
  const [member, setMember] = useState();
  const [newName, setNewName] = useState();
  const [newEmail, setNewEmail] = useState();
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [newPasswordConfirm, setNewPasswordConfirm] = useState();
  const user = JSON.parse(localStorage.getItem("user"));
  const onNewNameChange = (e) => {
    setNewName(e.target.value);
  };
  const onNewEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const darkGrey = `#696969`;
  const primaryColor = `#3399cc`;
  const lightGrey = `	#F5F5F5`;
  const token = localStorage.getItem("token");

  const getPassword = (e) => {
    setPassword(e.target.value);
  };
  const getNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  const getNewPasswordConfirm = (e) => {
    setNewPasswordConfirm(e.target.value);
  };

  useEffect(() => {
    const getProjectDetails = async () => {
      const memberDetails = await axios.get(
        `${DOMAIN.localhost}/api/v1/members/me`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setMember(memberDetails.data.member);
    };
    getProjectDetails();
  }, [token]);

  const onUpdateProfileHandler = async () => {
    await axios.patch(
      `${DOMAIN.localhost}/api/v1/members/update-me`,
      {
        name: newName,
        email: newEmail,
      },
      { headers: { authorization: `Bearer ${token}` } }
    );
  };

  const onUPdatePassword = async (e) => {
    try {
      await axios.patch(
        `${DOMAIN.localhost}/api/v1/members/update-password`,
        {
          password,
          newPassword,
          newPasswordConfirm,
        },
        { headers: { authorization: `Bearer ${token}` } }
      );
      alert("password updated succesfully");
    } catch (err) {
      if (
        err?.response?.data?.message.startsWith(
          "Member validation failed: passwordConfirm:"
        )
      )
        alert(
          "password and confirm password are not the same please check and try again"
        );
      alert(err?.response?.data?.message);
    }
  };

  return (
    <div style={{ backgroundColor: `${lightGrey}` }}>
      <Container>
        <Row>
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
                <Card.Body style={{ color: `${darkGrey}` }}>
                  <Card.Title
                    style={{
                      fontSize: "2rem",
                      borderBottom: "1px solid grey",
                    }}
                  >
                    PROFILE INFO
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
                      {member?.name?.toUpperCase()}
                    </Col>
                  </Row>
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
                      EMAIL:
                    </Col>
                    <Col
                      style={{
                        fontSize: "1.5rem",
                      }}
                    >
                      {member?.email}
                    </Col>
                  </Row>
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
                      ROLE:
                    </Col>
                    <Col
                      style={{
                        fontSize: "1.5rem",
                      }}
                    >
                      {member?.role}
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
                      Update User Info:
                    </Col>
                    <Col
                      style={{
                        fontSize: "1rem",
                      }}
                    ></Col>
                  </Row>

                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="changeProjectName">
                        Edit Name
                      </Form.Label>
                      <Form.Control
                        placeholder="new name"
                        id={"changeProjectName"}
                        onChange={onNewNameChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="changeProject description">
                        Edit Email
                      </Form.Label>
                      <Form.Control
                        placeholder="new Email"
                        id={"changeProject description"}
                        onChange={onNewEmailChange}
                      />
                    </Form.Group>
                    <Button
                      type={"submit"}
                      style={{ backgroundColor: `${primaryColor}` }}
                      onClick={onUpdateProfileHandler}
                    >
                      UPDATE Profile
                    </Button>
                  </Form>
                </Card.Body>
              </Card>{" "}
            </Row>
          </Col>
        </Row>
        <Row>
          <Col sm={2}></Col>
          <Col sm={8}>
            <Card
              style={{
                color: "darkGrey",
                marginTop: "5rem",
                border: "none",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              <Card.Body>
                <Card.Title style={{ color: `${darkGrey}`, fontSize: "2rem" }}>
                  UPDATE MY PASSWORD
                </Card.Title>
                <Form>
                  <fieldset>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="passwordInput">Password</Form.Label>
                      <Form.Control
                        id="passwordInput"
                        placeholder="password"
                        onChange={getPassword}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="newPasswordInput">
                        New Password
                      </Form.Label>
                      <Form.Control
                        id="newPasswordInput"
                        placeholder="new password"
                        onChange={getNewPassword}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="newPasswordConfirm">
                        New Password Confirm
                      </Form.Label>
                      <Form.Control
                        id="newPasswordConfirm"
                        placeholder="new Password confirm"
                        onChange={getNewPasswordConfirm}
                      />
                    </Form.Group>

                    <Button
                      type="submit"
                      style={{ backgroundColor: `${primaryColor}` }}
                      onClick={onUPdatePassword}
                    >
                      Submit
                    </Button>
                  </fieldset>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={2}></Col>
          {user?.data?.role === "admin" ? (
            <ProjectDiv
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link to={"/manage-users"}>
                <Button
                  type={"submit"}
                  style={{
                    backgroundColor: "red",
                    border: "none",
                    fontSize: "1.5rem",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  MANAGE USERS ROLES
                </Button>
              </Link>
            </ProjectDiv>
          ) : (
            ""
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
