import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/redux-slices/user-slice";
import { useNavigate } from "react-router-dom";

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
        "http://127.0.0.1:8000/api/v1/members/login",
        {
          email: value1,
          password: value2,
        }
      );

      // const data = await axios.get("http://127.0.0.1:8000/api/v1/members/me", {
      //   headers: {
      //     authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      // });

      localStorage.setItem("token", data.data.token);
      dispatch(setUser(data.data));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form>
        <input type="text" onChange={email} value1={value1} />
        <input type="text" onChange={password} value2={value2} />
        <button type="submit" onClick={onSubmitHandler}>
          submit
        </button>
      </form>
    </div>
  );
};
export default Login;
