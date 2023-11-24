import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { apiCalls } from '../../Data/Api';
import { getFollowedUsers, getBlockedUsers } from './UserTrack';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const handleLike = (postId) => {
    toast.success(`You liked post ${postId}`);
  };

  const handleUnlike = (postId) => {
    toast.warn(`You unliked post ${postId}`);
  };

  return (
    <Container>
      <h2 className="mb-4">Following Posts</h2>
      {followingPosts.length > 0 ? (
        followingPosts.map((post) => (
          <Row key={post.id} className="mb-4">
            <Col>
              <Card>
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle overflow-hidden mr-3" style={{ width: '50px', height: '50px' }}>
                      <img
                        src={`https://robohash.org/${post.userId}?size=50x50`}
                        alt={`User ${post.userId}`}
                        className="w-100 h-100"
                      />
                    </div>
                    <div>
                      <CardTitle tag="h5">{post.title}</CardTitle>
                      <CardText>{post.body}</CardText>
                      <Button color="success" onClick={() => handleLike(post.id)} className="mr-2">
                        <FaThumbsUp /> Like
                      </Button>
                      <Button color="danger" onClick={() => handleUnlike(post.id)}>
                        <FaThumbsDown /> Unlike
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        ))
      ) : (
        <Alert color="info">No posts from followed users available.</Alert>
      )}
      <ToastContainer />
    </Container>
  );
};

export default Following;
