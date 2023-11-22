import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Post from './Post';
import Comments from './Comments';
import { apiCalls } from '../../Data/Api';

const Feed = ({ isLoggedIn }) => {
  const [posts, setPosts] = useState([]);
  const [showPaywall, setShowPaywall] = useState(false);
  const [postsViewed, setPostsViewed] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const storedPostsViewed = localStorage.getItem('postsViewed');
    const initialPostsViewed = storedPostsViewed ? parseInt(storedPostsViewed, 10) : 0;
    setPostsViewed(initialPostsViewed);

    apiCalls.fetchPosts()
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const handlePostView = (post) => {
    setSelectedPost(post);
    setPostsViewed(postsViewed + 1);
  };

  useEffect(() => {
    localStorage.setItem('postsViewed', postsViewed.toString());
    if (!isLoggedIn && postsViewed >= 20) {
      setShowPaywall(true);
    }
  }, [postsViewed, isLoggedIn]);

  const closeModal = () => {
    setSelectedPost(null);
  };

  return (
    <Container className="py-8">
      <Row>
        <Col md={12}>
          <Row className="space-y-4">
            {posts.slice(0, showPaywall ? 20 : undefined).map((post) => (
              <Col key={post.id} md={4}>
                <Post key={post.id} data={post} showComments={true}>
                  <Comments postId={post.id} />
                  {(isLoggedIn || postsViewed < 20) && (
                    <button
                      onClick={() => handlePostView(post)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4 transition duration-500 ease-in-out transform hover:scale-105"
                    >
                      View Post
                    </button>
                  )}
                </Post>
              </Col>
            ))}
          </Row>
          {showPaywall && (
            <div className="p-4 bg-gray-100 border border-gray-300 rounded-md">
              <p className="text-xl font-semibold mb-2">Upgrade to Premium</p>
              <p>Unlock unlimited access to posts by upgrading to our Premium membership.</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4 transition duration-500 ease-in-out transform hover:scale-105">
                Upgrade Now
              </button>
            </div>
          )}
        </Col>
      </Row>

      {/* Modal for displaying the selected post and comments */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-4 rounded-md">
            <button className="absolute top-2 right-2 text-xl font-bold" onClick={closeModal}>
              X
            </button>
            <Post data={selectedPost} showComments={true} />
            <Comments postId={selectedPost.id} />
            <button className="bg-red-500 text-white px-4 py-2 rounded-full mt-4" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Feed;
