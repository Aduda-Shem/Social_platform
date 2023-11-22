import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Post from './Post';
import Comments from './Comments';
import { apiCalls } from '../../Data/Api';

const Feed = ({ isLoggedIn }) => {
  const [posts, setPosts] = useState([]);
  const [showPaywall, setShowPaywall] = useState(false);
  const [postsViewed, setPostsViewed] = useState(0);

  useEffect(() => {
    const storedPostsViewed = localStorage.getItem('postsViewed');
    const initialPostsViewed = storedPostsViewed ? parseInt(storedPostsViewed, 10) : 0;
    setPostsViewed(initialPostsViewed);

    apiCalls.fetchPosts()
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const handlePostView = () => {
    setPostsViewed(postsViewed + 1);
  };

  useEffect(() => {
    localStorage.setItem('postsViewed', postsViewed.toString());
    if (!isLoggedIn && postsViewed >= 20) {
      setShowPaywall(true);
    }
  }, [postsViewed, isLoggedIn]);

  return (
    <Container className="py-8">
      <Row>
        <Col md={12}>
          <Row className="space-y-4">
            {posts.slice(0, showPaywall ? 20 : undefined).map((post) => (
              <Col key={post.id} md={4}>
                <Post key={post.id} data={post} showComments={true}>
                  <Comments postId={post.id} />
                  <button onClick={handlePostView}>View Post</button>
                </Post>
              </Col>
            ))}
          </Row>
          {showPaywall && (
            <div>
              {/* Display paywall */}
              <p>Pay to access more posts!</p>
              {/* You can include a payment button or link to initiate the premium membership process */}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Feed;
