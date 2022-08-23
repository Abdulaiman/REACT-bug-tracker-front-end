import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/redux-slices/user-slice";
import { useNavigate } from "react-router-dom";
import MyButton from "../button/button-component";
import { DOMAIN } from "../../utilities/utils";
import {
  SignUpContainer,
  FormContainer,
  InputContainer,
  Input,
  SignUpStyle,
  ButtonContainer,
} from "./sign-up.styles.jsx";
import img from "../../images/img-2.jpg";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const dispatch = useDispatch();

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setpassword(event.target.value);
  };
  const passwordConfirmHandler = (event) => {
    setPasswordConfirm(event.target.value);
  };
  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const data = await axios.post(
        `${DOMAIN.localhost}/api/v1/members/sign-up`,
        {
          name,
          email,
          password,
          passwordConfirm,
        }
      );
      localStorage.setItem("token", data.data.token);
      dispatch(setUser(data.data));
      console.log({ name, email, password, passwordConfirm });
      navigate("/");
    } catch (err) {
      console.log(err);
      if (err.response.data.message.startsWith("E11000"))
        alert("email adress is already taken please try a different email");
      if (
        err.response.data.message.startsWith(
          "Member validation failed: passwordConfirm"
        )
      )
        alert("password and password confirm must be the same");
    }
  };

  return (
    <SignUpContainer imgUrl={img}>
      <FormContainer>
        <form>
          <SignUpStyle>
            <h2>SignUp</h2>
          </SignUpStyle>
          <InputContainer>
            <Input
              type="text"
              placeholder="name"
              onChange={nameHandler}
              // password={password}
            />
            <Input
              type="email"
              placeholder="example@email.com"
              onChange={emailHandler}
              // email={email}
            />
            <Input
              type="password"
              placeholder="password"
              onChange={passwordHandler}
              // password={password}
            />
            <Input
              type="password"
              placeholder="confirm password"
              onChange={passwordConfirmHandler}
              // password={password}
            />
          </InputContainer>
          <ButtonContainer>
            <MyButton type="submit" onClick={onSubmitHandler}>
              Sign Up
            </MyButton>
          </ButtonContainer>
        </form>
      </FormContainer>
    </SignUpContainer>
  );
};
export default SignUp;
