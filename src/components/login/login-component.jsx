import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/redux-slices/user-slice";
import { Link, useNavigate } from "react-router-dom";
import "./login-component.styles.jsx";
import MyButton from "../button/button-component";
import { loginButton } from "./login-component.styles.jsx";
import { DOMAIN } from "../../utilities/utils";
import {
  LoginContainer,
  FormContainer,
  InputContainer,
  Input,
  LoginStyle,
  Paragraph,
  ButtonContainer,
} from "./login-component.styles.jsx";
import img from "../../images/img-2.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const dispatch = useDispatch();

  const email = (event) => {
    setValue1(event.target.value);
  };
  const password = (event) => {
    setValue2(event.target.value);
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const data = await axios.post(
        `${DOMAIN.localhost}/api/v1/members/login`,
        {
          email: value1,
          password: value2,
        }
      );
      localStorage.setItem("token", data.data.token);
      dispatch(setUser(data.data));
      navigate("/");
    } catch (err) {
      alert("incorrect email address or password please check and try again");
    }
  };

  return (
    <LoginContainer imgUrl={img}>
      <FormContainer>
        <form>
          <LoginStyle>
            <h2>LOGIN</h2>
          </LoginStyle>
          <InputContainer>
            <Input
              type="email"
              placeholder="example@email.com"
              onChange={email}
              value1={value1}
            />
            <Input
              type="password"
              placeholder="password"
              onChange={password}
              value2={value2}
            />
          </InputContainer>
          <Paragraph>
            Don't have an account?
            <span>
              <Link to={"/sign-up"}> signUp</Link>
            </span>
          </Paragraph>
          <ButtonContainer>
            <MyButton type="submit" onClick={onSubmitHandler}>
              Log in
            </MyButton>
          </ButtonContainer>
        </form>
      </FormContainer>
    </LoginContainer>
  );
};
export default Login;
