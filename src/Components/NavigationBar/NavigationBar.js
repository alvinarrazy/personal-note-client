import React from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function NavigationBar() {
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand className='ml-6' to="/">Aqila's Personal Note</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse style={{ marginRight: 0 }} id="basic-navbar-nav">
                    <Nav className="me-auto align-items-center">
                        <Link className='nav-link' to="/">Assignment List</Link>
                        <Link className='nav-link ml-4' to="/new">
                            <Button variant="primary">New assignment!</Button>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
