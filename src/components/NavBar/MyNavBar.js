import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { LOGO, LOGIN, LOGOUT, NEW_USER, USER } from '../../labels/Link';
import { LOGIN_PATH, HOME_PATH } from '../../utils/constants';
import { Link } from 'react-router-dom';
import "./MyNavBar.scss"
const MyNavBar = () => {
    const isLoggedIn = localStorage.getItem("user");
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <Navbar bg="dark" expand="lg">
            <Container>
                <Navbar.Brand><Link to={isLoggedIn ? HOME_PATH : LOGIN_PATH} className="text-decoration-none text-secondary navbar_brand-name">{LOGO}</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <NavDropdown title={
                            <span className="text-light my-auto">{isLoggedIn ? user.name : USER}</span>
                        } id="basic-nav-dropdown" className="navbar_dropdown">
                            <Link to="/" onClick={() => { localStorage.clear() }} className="text-decoration-none text-secondary navbar_dropdown_link">{isLoggedIn ? LOGOUT : LOGIN}</Link>
                            {isLoggedIn ? (<></>) : (
                                <>
                                    <NavDropdown.Divider />
                                    <Link to="/signup" className="text-decoration-none text-secondary navbar_dropdown_link">{NEW_USER}</Link>
                                </>
                            )
                            }
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default MyNavBar
