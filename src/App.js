import React from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import Feed from './components/Account/Feed';
import './App.css';
import Header from './components/Breadcrumbs/Header'; 
import Footer from './components/Breadcrumbs/Footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Container className="vh-100 d-flex align-items-center">
          <Row className="justify-content-center w-100">
            <Col md={6}>
              <Card className="login-card shadow">
                <CardBody>
                <Header />
                  <h2 className="text-center mb-4">Welcome to Elewa Chat</h2>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </header>
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md={8}>
            <Feed />
          </Col>
        </Row>
      </Container>
      <Footer/>
    </div>
  );
}

export default App;
