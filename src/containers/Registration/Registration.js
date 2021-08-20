import React, { useState } from 'react';
import './Registration.scss';
import { Button, Form } from 'react-bootstrap';
import axios from "axios";
import alertify from 'alertifyjs';
import { USER_SIGNUP, ENTER_NAME, ENTER_EMAIL, ENTER_PASSWORD, NOT_SHARING, AGREEMENT } from "../../utils/constants";
import { SIGN_UP } from '../../labels/button';
import AuthWrapper from '../../hoc/AuthWrapper/AuthWrapper';
import { Link } from 'react-router-dom';
const Registration = ({ history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onFormSubmitHandler = event => {
        event.preventDefault();
        const data = { name, email, password };
        axios
            .post(`${process.env.REACT_APP_BASE_URL}${USER_SIGNUP}`, data)
            .then(res => {
                alertify.success(res.data.message);
                history.push("/activate")
            })
            .catch(err => {
                alertify.warning(err.response.data.message);
            });
    }
    return (
        <AuthWrapper>
            <h1 className="text-center mb-4">Create Account</h1>
            <Form onSubmit={onFormSubmitHandler} className="mt-4">
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="text"
                        placeholder={ENTER_NAME}
                        value={name}
                        onChange={event => {
                            setName(event.target.value);
                        }}
                        required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                        type="email"
                        placeholder={ENTER_EMAIL}
                        value={email}
                        onChange={event => {
                            setEmail(event.target.value);
                        }}
                        required />
                    <Form.Text className="text-muted">
                        {NOT_SHARING}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                        type="password"
                        placeholder={ENTER_PASSWORD}
                        value={password}
                        onChange={event => {
                            setPassword(event.target.value);
                        }}
                        required
                    />
                    <Form.Text className="text-muted">
                        {AGREEMENT}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="d-flex justify-content-end">
                    <Button variant="dark" type="submit">
                        {SIGN_UP}
                    </Button>
                </Form.Group>
                <Form.Group className="text-center">
                    <Form.Text>
                        Already have account? · <Link to="/" className="login__link">Login</Link>
                    </Form.Text>
                </Form.Group>
            </Form>
        </AuthWrapper>
    )
}

export default Registration
