// App.js

import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Auth from './components/AuthComponent';
import './App.css';

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        setLoggedIn(true);
    };

    const handleLogout = () => {
        setLoggedIn(false);
    };

    return (
        <div className="App">
            <header className="App-header">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={6}>
                            <Card className="login-card">
                                <CardBody>
                                    <h2 className="text-center mb-4">Welcome to Elewa Chat</h2>
                                    <Form>
                                        <Auth
                                            isLoggedIn={isLoggedIn}
                                            onLogin={handleLogin}
                                            onLogout={handleLogout}
                                        />
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </header>
        </div>
    );
}

export default App;
