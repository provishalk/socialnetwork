import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { LOGO, HOME, SIGNIN, LOGIN, NEW_USER } from '../../labels/Link';
import { Link } from 'react-router-dom';
import "./MyNavBar.scss"
const MyNavBar = () => {
    return (
        <Navbar bg="dark" expand="lg">
            <Container>
                <Navbar.Brand><Link to="/home" className="text-decoration-none text-secondary navbar_brand-name">{LOGO}</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Link to="/home" className="text-decoration-none text-light my-auto navbar_label">{HOME}</Link>
                        <NavDropdown title={
                            <span className="text-light my-auto">{SIGNIN}</span>
                        } id="basic-nav-dropdown" className="navbar_dropdown">
                            <Link to="/login" className="text-decoration-none text-secondary navbar_dropdown_link">{LOGIN}</Link>
                            <NavDropdown.Divider />
                            <Link to="/signup" className="text-decoration-none text-secondary navbar_dropdown_link">{NEW_USER}</Link>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MyNavBar
