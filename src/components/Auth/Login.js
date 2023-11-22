// Login.js
import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, Alert, Card, CardBody } from 'reactstrap';
import { apiCalls } from '../../Data/Api';
import '../../styles/tailwind.css'; // Adjust the path based on your project structure

const Login = ({ isOpen, toggle, onLogin, onLogout }) => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null);

    const handleLogin = async () => {
        try {
            const users = await apiCalls.fetchUsers();

            const foundUser = users.find(
                (user) => (user.username === usernameOrEmail || user.email === usernameOrEmail) &&
                    user.address.zipcode === password
            );

            if (foundUser) {
                setLoggedInUser(foundUser);
                onLogin();
                setError('');
                toggle();
            } else {
                setError('Invalid credentials');
            }
        } catch (error) {
            setError(`Error fetching users: ${error.message}`);
        }
    };

    const handleLogout = () => {
        setLoggedInUser(null);
        onLogout();
    };

    return (
        <div>
            {loggedInUser ? (
                <Card className="m-2 p-3">
                    <CardBody>
                        <p className="mb-3">Welcome, {loggedInUser.username}!</p>
                        <Button color="primary" onClick={handleLogout}>
                            Logout
                        </Button>
                    </CardBody>
                </Card>
            ) : (
                <Modal isOpen={isOpen} toggle={toggle}>
                    <ModalHeader toggle={toggle} className="bg-primary text-white">Login</ModalHeader>
                    <ModalBody>
                        <Card>
                            <CardBody>
                                <Form>
                                    <FormGroup>
                                        <Label for="usernameOrEmail">Username or Email</Label>
                                        <Input
                                            type="text"
                                            name="usernameOrEmail"
                                            id="usernameOrEmail"
                                            placeholder="Enter username or email"
                                            value={usernameOrEmail}
                                            onChange={(e) => setUsernameOrEmail(e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">Password</Label>
                                        <Input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </FormGroup>
                                    {error && <Alert color="danger" className="mt-3">{error}</Alert>}
                                    <Button color="primary" className="mt-3" onClick={handleLogin}>
                                        Login
                                    </Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </ModalBody>
                </Modal>
            )}
        </div>
    );
};

export default Login;
