import React, { useState } from 'react';
import AuthWrapper from '../../hoc/AuthWrapper/AuthWrapper';
import { Button, Form } from 'react-bootstrap';
import { NOT_SHARING, ENTER_EMAIL, ENTER_PASSWORD, USER_LOGIN, SUCCESS_LOGIN } from "../../utils/constants"
import { LOGIN } from '../../labels/button';
import axios from 'axios';
import alertify from 'alertifyjs';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onSumbitHandler = event => {
        event.preventDefault();
        const data = { email, password };
        axios
            .post(`${process.env.REACT_APP_BASE_URL}${USER_LOGIN}`, data)
            .then(res => {
                alertify.success(SUCCESS_LOGIN);
            })
            .catch(err => {
                alertify.warning(err.response.data.message);
            });
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
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                        required
                    />
                </Form.Group>
                <Form.Group className="d-flex justify-content-end">
                    <Button variant="dark" type="submit">
                        {LOGIN}
                    </Button>
                </Form.Group>
            </Form>
        </AuthWrapper>
    )
}

export default Login
