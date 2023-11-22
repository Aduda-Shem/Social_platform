import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Profile = ({ user }) => {
  return (
    <Container>
      <h2 className="mb-4">User Profile</h2>
      <Row>
        <Col>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Zip Code:</strong> {user.zipCode}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
