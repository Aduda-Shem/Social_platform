import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Input, Button } from 'reactstrap';
import Post from './Post';
import Comments from './Comments';
import { apiCalls } from '../../Data/Api';

const Feed = ({ isLoggedIn }) => {
  const [posts, setPosts] = useState([]);
  const [showPaywall, setShowPaywall] = useState(false);
  const [postsViewed, setPostsViewed] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [recommendedPost, setRecommendedPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedPostsViewed = localStorage.getItem('postsViewed');
        const initialPostsViewed = storedPostsViewed ? parseInt(storedPostsViewed, 10) : 0;
        setPostsViewed(initialPostsViewed);

        const data = await apiCalls.fetchPosts();
        setPosts(data);
        setLoading(false);

        if (data.length > 0) {
          setRecommendedPost(data[0]);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePostView = (post) => {
    setSelectedPost(post);
    setPostsViewed(postsViewed + 1);
  };

  const handleSearch = () => {
    console.log(`Searching for posts containing: ${searchTerm}`);
  };

  const renderPostButton = (post) => (
    (isLoggedIn || postsViewed < 20) && (
      <Button
        onClick={() => handlePostView(post)}
        color="primary"
        className="mt-4"
      >
        View Post
      </Button>
    )
  );

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
      <Row className="mb-4">
        <Col md={6}>
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={6} className="text-right">
          <Button color="success" onClick={handleSearch}>Search</Button>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          {loading ? (
            <p className="text-center text-2xl font-bold text-gray-700">Loading...</p>
          ) : (
            recommendedPost && (
              <div className="mt-8 p-4 bg-yellow-200 border border-yellow-300 rounded-md">
                <p className="text-lg font-semibold text-yellow-800">🌟 Recommended Post:</p>
                <Post data={recommendedPost} showComments={false} />
                <Button
                  color="info"
                  className="mt-2"
                  onClick={() => handlePostView(recommendedPost)}
                >
                  View Recommendation
                </Button>
              </div>
            )
          )}
        </Col>
      </Row>

      <Row className="space-y-4">
        {posts
          .filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .slice(0, showPaywall ? 20 : undefined)
          .map((post) => (
            <Col key={post.id} md={4}>
              <Post key={post.id} data={post} showComments={true}>
                <Comments postId={post.id} />
                {renderPostButton(post)}
              </Post>
            </Col>
          ))}
      </Row>

      {showPaywall && (
        <div className="p-4 bg-gray-100 border border-gray-300 rounded-md">
          <p className="text-3xl font-semibold mb-2 text-blue-500">Upgrade to Premium</p>
          <p className="text-gray-700">
            Unlock unlimited access to posts by upgrading to our Premium membership.
          </p>
          <Button color="primary" className="mt-4" disabled>
            Upgrade Now
          </Button>
        </div>
      )}

      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-8 rounded-md">
            <button
              className="absolute top-4 right-4 text-xl font-bold text-gray-700"
              onClick={closeModal}
            >
              X
            </button>
            <Post data={selectedPost} showComments={true} />
            <Comments postId={selectedPost.id} />
            <button className="bg-red-500 text-white px-6 py-3 rounded-full mt-4" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Feed;