import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import './breadcrumbs.css';

const Footer = () => {
  return (
    <footer className="footer-area text-center">
      <Container>
        <Row>
          <Col xs={13} md={13}>
            <p className="footer-text">
              Created with by{" "}
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
              >
                Aduda Shem
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
