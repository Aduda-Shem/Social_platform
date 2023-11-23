import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardTitle,
  Alert,
} from "reactstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Profile from "./Profile";
import { apiCalls } from "../../Data/Api";
import { isAuthenticated, login, logout, getAuthToken } from "./auth";

const Login = ({ isOpen, toggle, onLogin, onLogout }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(
    isAuthenticated() ? getAuthToken() : null
  );

  const handleLogin = async () => {
    try {
      const users = await apiCalls.fetchUsers();

      const foundUser = users.find(
        (user) =>
          (user.username === usernameOrEmail ||
            user.email === usernameOrEmail) &&
          user.address.zipcode === password
      );

      if (foundUser) {
        login(foundUser);
        setLoggedInUser(foundUser);
        onLogin();
        setError("");
        toggle();
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError(`Error fetching users: ${error.message}`);
    }
  };

  const handleLogout = () => {
    logout();
    setLoggedInUser(null);
    onLogout();
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 backdrop-blur-md"></div>}
      <Card
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 ${
          isOpen ? "block" : "hidden"
        } bg-gray-300`}
      >
        <CardBody className="bg-gray-500 p-8 rounded-md shadow-lg text-white">
          {loggedInUser ? (
            <>
              <CardTitle tag="h5" className="mb-3 text-xl font-semibold">
                Welcome, {loggedInUser.username}!
              </CardTitle>
              <Profile user={loggedInUser} />
              <Button color="primary" className="mt-3" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Form>
              <FormGroup className="mb-4">
                <Label for="usernameOrEmail" className="text-sm text-gray-300">
                  Username or Email
                </Label>
                <Input
                  type="text"
                  name="usernameOrEmail"
                  id="usernameOrEmail"
                  placeholder="Enter username or email"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  className="border p-2 w-full bg-gray-400 text-black"
                />
              </FormGroup>
              <FormGroup className="mb-4">
                <Label for="password" className="text-sm text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full bg-gray-400 text-black"
                  />
                  <span
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-300" />
                    ) : (
                      <FaEye className="text-gray-300" />
                    )}
                  </span>
                </div>
              </FormGroup>
              {error && (
                <Alert color="danger" className="mt-3">
                  {error}
                </Alert>
              )}
              <Button color="primary" className="mt-3" onClick={handleLogin}>
                Login
              </Button>
              <Button color="danger" className="mt-3 ml-3" onClick={toggle}>
                Cancel
              </Button>
            </Form>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default Login;
