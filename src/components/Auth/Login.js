import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert, Card, CardBody } from 'reactstrap';

const Auth = ({ isLoggedIn, onLogin, onLogout }) => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((users) => {
                const foundUser = users.find(
                    (user) => (user.username === usernameOrEmail || user.email === usernameOrEmail) &&
                        user.address.zipcode === password
                );

                if (foundUser) {
                    onLogin();
                    setError('');
                } else {
                    setError('Invalid credentials');
                }
            })
            .catch((error) => {
                setError(`Error fetching users: ${error}`);
            });
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-primary">
            <Card className="shadow p-4" style={{ width: '400px', borderRadius: '15px' }}>
                <CardBody className="text-center">
                    <h2 className="text-white mb-4">Login</h2>
                    <Form>
                        <FormGroup>
                            <Label for="usernameOrEmail" className="text-white">Username or Email</Label>
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
                            <Label for="password" className="text-white">Password</Label>
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
                        <Button color="light" className="mt-3" onClick={handleLogin}>
                            Login
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
};

export default Auth;
