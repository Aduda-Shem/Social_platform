// Following.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Alert } from 'reactstrap';

const Following = ({ isLoggedIn }) => {
  const [followingUsers, setFollowingUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setFollowingUsers(response.data);
      } catch (error) {
        console.error('Error fetching following users:', error);
      }
    };

    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  return (
    <Container>
      {isLoggedIn ? (
        <>
          <h2 className="mb-4">Following Users</h2>
          {followingUsers.map((user) => (
            <Row key={user.id} className="mb-4">
              <Col>
                <h4>{user.name}</h4>
                <p>Email: {user.email}</p>
              </Col>
            </Row>
          ))}
        </>
      ) : (
        <Alert color="warning">Login to see your following users.</Alert>
      )}
    </Container>
  );
};

export default Following;
