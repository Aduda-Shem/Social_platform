// UserPosts.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import { apiCalls } from '../../Data/Api';

const UserPosts = ({ userId }) => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserPosts(data);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchUserPosts();
  }, [userId]);

  return (
    <Container>
      {userPosts.length > 0 ? (
        <>
          <h2 className="mb-4">User Posts</h2>
          {userPosts.map((post) => (
            <Row key={post.id} className="mb-4">
              <Col>
                <h4>{post.title}</h4>
                <p>{post.body}</p>
              </Col>
            </Row>
          ))}
        </>
      ) : (
        <Alert color="info">No posts found for the user.</Alert>
      )}
    </Container>
  );
};

export default UserPosts;
