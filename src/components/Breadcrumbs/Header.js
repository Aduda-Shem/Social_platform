import React from 'react';
import { NavLink, BrowserRouter as Router } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import './breadcrumbs.css';

const Header = () => {
  return (
    <Router>
      <div className="nav-wrap">
        
        <Navbar expand="lg" className="justify-content-end">
          <Container>
            <Navbar.Brand>
              <NavLink to="/">
                <img src="" className="App-logo" alt="logo" />
              </NavLink>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Nav.Item>
                  <NavLink to="/home" activeClassName="selected">
                    Home
                  </NavLink>
                </Nav.Item>

                <Nav.Item>
                  <NavLink to="/login" activeClassName="selected">
                    Login
                  </NavLink>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </Router>
  );
};

export default Header;
