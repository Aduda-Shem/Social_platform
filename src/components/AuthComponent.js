// src/components/Auth.js
import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

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
        <div>
            {isLoggedIn ? (
                <div>
                    <h2>Welcome, User!</h2>
                    <Button color="danger" onClick={onLogout}>
                        Logout
                    </Button>
                </div>
            ) : (
                <div>
                    <h2>Login</h2>
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
                        {error && <Alert color="danger">{error}</Alert>}
                        <Button color="primary" onClick={handleLogin}>
                            Login
                        </Button>
                    </Form>
                </div>
            )}
        </div>
    );
};

export default Auth;
