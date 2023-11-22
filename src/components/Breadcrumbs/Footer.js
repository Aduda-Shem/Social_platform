// Footer.js
import React from 'react';
import { Col, Container, Row } from 'reactstrap';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-5 text-center">
      <Container>
        <Row>
          <Col xs={12} md={12}>
            <p className="text-sm text-gray-600">
              Created by{' '}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
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
