import React, { useState } from 'react'
import axios from 'axios';
import alertify from 'alertifyjs';
import { Button, Form } from 'react-bootstrap';
import { ENTER_EMAIL, ENTER_OTP, ACCOUNT_ACTIVATE, RESEND_OTP, SOMETHING_WRONG } from '../../utils/constants';
import { ACTIVATE, RESEND } from '../../labels/button';
import AuthWrapper from '../../hoc/AuthWrapper/AuthWrapper';

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
                history.push("/login")
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
                if (!(err.response === undefined)) {
                    alertify.warning(err.response.data.message);
                }
                else {
                    alertify.error(SOMETHING_WRONG);
                }
            });
    }
    return (
        <AuthWrapper>
            <h1 className="text-center">Account Activation</h1>
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
                <Form.Group className="d-flex justify-content-between">
                    <Button variant="success" type="submit">
                        {ACTIVATE}
                    </Button>
                    <Button variant="light" type="button" onClick={onResentCode}>
                        {RESEND}
                    </Button>
                </Form.Group>
            </Form>
        </AuthWrapper>
    )
}
export default Activate
