import React, { useState } from 'react';
import './Registration.scss';
import { Button, Form } from 'react-bootstrap';
import axios from "axios";
import alertify from 'alertifyjs';
const Registration = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onFormSubmitHandler = event => {
        event.preventDefault();
        const data = { name, email, password };
        axios
            .post("https://social-nodejs-be.herokuapp.com/api/user/signup", data)
            .then(res => {
                alertify.success(res.data.message); 
                setName("");
                setEmail("");
                setPassword("");

            })
            .catch(err => {
                alertify.warning(err.response.data.message);
            });
    }
    return (
        <div className="registration_container container">
            <h1>SIGN UP</h1>
            <div className="row">
                <div className="col-md-6 m-auto">
                    <Form onSubmit={onFormSubmitHandler} className="mt-4">
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Control
                                type="text"
                                placeholder="Enter Full Name"
                                value={name}
                                onChange={event => {
                                    setName(event.target.value);
                                }}
                                required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={event => {
                                    setEmail(event.target.value);
                                }}
                                required />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={event => {
                                    setPassword(event.target.value);
                                }}
                                required
                            />
                            <Form.Text className="text-muted">
                                By clicking Sign Up, you agree to our Terms, Data Policy and Cookie Policy.
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="btn-success">
                            Sign Up
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Registration
