import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Post from './Post';
import Comments from './Comments';
import { apiCalls } from '../../Data/Api';

const Feed = ({ isLoggedIn, remainingFreePosts }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    apiCalls.fetchPosts()
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <Container className="py-8">
      <Row>
        <Col md={12}>
          <Row className="space-y-4">
            {isLoggedIn
              ? posts.map((post) => (
                  <Col key={post.id} md={4}>
                    <Post key={post.id} data={post} showComments={true}>
                      <Comments postId={post.id} />
                    </Post>
                  </Col>
                ))
              : null}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Feed;
