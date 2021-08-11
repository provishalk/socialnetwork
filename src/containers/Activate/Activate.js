import React, { useState } from 'react'
import axios from 'axios';
import alertify from 'alertifyjs';
import { Button, Form } from 'react-bootstrap';
import { ENTER_EMAIL, ENTER_OTP, ACCOUNT_ACTIVATE, RESEND_OTP } from '../../utils/constants';
import { ACTIVATE, RESEND } from '../../labels/button';
import AuthWrapper from '../../hoc/AuthWrapper/AuthWrapper';
import "./Activate.scss"

const Activate = ({ history }) => {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const onClickHandler = (event) => {
        event.preventDefault();
        const data = { email, code };
        axios
            .post(`${process.env.REACT_APP_BASE_URL}${ACCOUNT_ACTIVATE}`, data)
            .then(res => {
                alertify.success(res.data.message);
                history.push("/")
            })
            .catch(err => {
                alertify.warning(err.response.data.message);
            });
    }
    const onResentCode = event => {
        if (email.trim().length === 0) {
            alertify.warning(ENTER_EMAIL);
            return;
        }
        const data = { email }
        axios
            .post(`${process.env.REACT_APP_BASE_URL}${RESEND_OTP}`, data)
            .then(res => {
                alertify.success(res.data.message);
            })
            .catch(err => {
                    alertify.warning(err?.response?.data?.message);
            });
    }
    return (
        <AuthWrapper>
            <h1 className="text-center mb-4">Account Activation</h1>
            <Form onSubmit={onClickHandler} className="mt-4">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                        type="email"
                        placeholder={ENTER_EMAIL}
                        value={email}
                        onChange={event => {
                            setEmail(event.target.value);
                        }}
                        required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicOtp">
                    <Form.Control
                        type="text"
                        placeholder={ENTER_OTP}
                        value={code}
                        onChange={(event) => {
                            setCode(event.target.value);
                        }}
                        required
                    />
                </Form.Group>
                <Form.Group className="d-flex justify-content-end ">
                    <Button variant="light" type="button" onClick={onResentCode}>
                        {RESEND}
                    </Button>
                    <Button variant="dark" type="submit" className="activate-container_activate-btn">
                        {ACTIVATE}
                    </Button>
                </Form.Group>
            </Form>
        </AuthWrapper>
    )
}
export default Activate
