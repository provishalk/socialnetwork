import React, { useState } from "react";
import axios from "axios";
import alertify from "alertifyjs";
import Spinner from 'react-bootstrap/Spinner';
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Button, Form, InputGroup } from "react-bootstrap";
import AuthWrapper from "../../hoc/AuthWrapper/AuthWrapper";
import {
  ENTER_EMAIL,
  ENTER_PASSWORD,
  USER_LOGIN,
} from "../../utils/constants";
import { LOGIN } from "../../labels/button";
import { isLoggedIn } from "../../utils/functions";
import "./Login.scss";
const Login = ({ history }) => {
  if (isLoggedIn()) {
    history.push("/home");
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordFeildType, setPasswordFeildType] = useState("password");
  const onSumbitHandler = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const data = { email, password };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}${USER_LOGIN}`, data)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.data));
        history.push("/home");
      })
      .catch((err) => {
        setIsLoading(false);
        alertify.warning(err?.response?.data?.message);
      });
  };
  const onViewPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
    isPasswordVisible?setPasswordFeildType("password"):setPasswordFeildType("text");
  }
  return (
    <AuthWrapper>
      <h3 className="text-center mb-4 ">{LOGIN}</h3>
      <Form className="mt-4" onSubmit={onSumbitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder={ENTER_EMAIL}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <InputGroup>
            <Form.Control
              type={passwordFeildType}
              className="login__password-input"
              placeholder={ENTER_PASSWORD}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required
            />
            <InputGroup.Text className="login__password-eye" onClick={onViewPassword}>
              {isPasswordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group className="d-flex justify-content-end">
          <Button variant="dark" type="submit" className="login__loginButton" disabled={isLoading}>
            {isLoading ? (<Spinner animation="border" variant="light" size="sm" />) : (<>{LOGIN}</>)}
          </Button>
        </Form.Group>
        <Form.Group className="text-center">
          <Form.Text>
            Forgot password? ·{" "}
            <Link to="/signup" className="login__link">
              Sign up
            </Link>
          </Form.Text>
        </Form.Group>
      </Form>
    </AuthWrapper>
  );
};

export default Login;
