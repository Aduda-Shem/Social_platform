// MyPosts.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';

const MyPosts = ({ isLoggedIn, userId }) => {
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then((response) => response.json())
        .then((data) => setMyPosts(data));
    }
  }, [isLoggedIn, userId]);

  return (
    <Container>
      {isLoggedIn ? (
        <>
          <h2 className="mb-4">My Posts</h2>
          {myPosts.length > 0 ? (
            myPosts.map((post) => (
              <Row key={post.id} className="mb-4">
                <Col>
                  <h4>{post.title}</h4>
                  <p>{post.body}</p>
                </Col>
              </Row>
            ))
          ) : (
            <Alert color="info">You have no posts yet. Create a post to see it here!</Alert>
          )}
        </>
      ) : (
        <Alert color="warning">Please login to view your posts.</Alert>
      )}
    </Container>
  );
};

export default MyPosts;
