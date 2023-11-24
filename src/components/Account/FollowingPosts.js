import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import { apiCalls } from '../../Data/Api';
import { getFollowedUsers, getBlockedUsers } from './UserTrack';

const Following = () => {
  const [followingPosts, setFollowingPosts] = useState([]);

  useEffect(() => {
    const fetchFollowingPosts = async () => {
      try {
        const followedUsers = getFollowedUsers();
        const blockedUsers = getBlockedUsers();

        const posts = await apiCalls.fetchPosts();

        const filteredPosts = posts.filter(
          (post) => followedUsers.includes(post.userId) && !blockedUsers.includes(post.userId)
        );

        setFollowingPosts(filteredPosts);
      } catch (error) {
        console.error('Error fetching following posts:', error);
      }
    };

    fetchFollowingPosts();
  }, []);

  return (
    <Container>
      <h2 className="mb-4">Following Posts</h2>
      {followingPosts.length > 0 ? (
        followingPosts.map((post) => (
          <Row key={post.id} className="mb-4">
            <Col>
              <div>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </div>
            </Col>
          </Row>
        ))
      ) : (
        <Alert color="info">No posts from followed users available.</Alert>
      )}
    </Container>
  );
};

export default Following;
