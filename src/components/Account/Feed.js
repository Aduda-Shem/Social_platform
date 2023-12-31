import React, { useState, useEffect } from "react";
import { Container, Row, Col, Input, Button, Card, Media } from "reactstrap";
import Post from "./Post";
import Comments from "./Comments";
import PremiumUpgrade from "./PremiumUpgrade";
import { apiCalls } from "../../Data/Api";

const Feed = ({ isLoggedIn }) => {
  const [posts, setPosts] = useState([]);
  const [showPaywall, setShowPaywall] = useState(false);
  const [postsViewed, setPostsViewed] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [recommendedPost, setRecommendedPost] = useState(null);
  const [displayedPosts, setDisplayedPosts] = useState(20);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedPostsViewed = localStorage.getItem("postsViewed");
        const initialPostsViewed = storedPostsViewed
          ? parseInt(storedPostsViewed, 10)
          : 0;
        setPostsViewed(initialPostsViewed);

        const data = await apiCalls.fetchPosts();
        setPosts(data);
        setLoading(false);

        if (data.length > 0) {
          setRecommendedPost(data[0]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePostView = (post) => {
    setSelectedPost(post);
    setPostsViewed(postsViewed + 1);
  };

  const renderPostButton = (post) =>
    (isLoggedIn || postsViewed < 20) && (
      <Button
        onClick={() => handlePostView(post)}
        color="primary"
        className="mt-4"
      >
        View Post
      </Button>
    );

  useEffect(() => {
    localStorage.setItem("postsViewed", postsViewed.toString());
    if (!isLoggedIn && postsViewed >= 20) {
      setShowPaywall(true);
    }
  }, [postsViewed, isLoggedIn]);

  const closeModal = () => {
    setSelectedPost(null);
  };

  const loadMorePosts = () => {
    setDisplayedPosts(displayedPosts + 20);
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
            className="p-2 border rounded"
          />
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          {loading ? (
            <p className="text-center text-2xl font-bold text-gray-700">
              Loading...
            </p>
          ) : (
            recommendedPost && (
              <Card className="mt-8 p-4 bg-yellow-200 border border-yellow-300 rounded-md">
                <h2 className="text-lg font-semibold text-yellow-800 mb-4">
                  🌟 Recommended Post:
                </h2>
                <Post data={recommendedPost} showComments={false} />
                <Button
                  color="info"
                  className="mt-2"
                  onClick={() => handlePostView(recommendedPost)}
                >
                  View Recommendation
                </Button>
              </Card>
            )
          )}
        </Col>
      </Row>

      <Container>
        <Row xs={1} md={2} lg={3} className="g-4">
          {posts
            .filter((post) =>
              post.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .slice(0, displayedPosts)
            .map((post) => (
              <Col key={post.id}>
                <Card className="p-3 border rounded-md">
                  <Media className="mt-3">
                    <Media left>
                      <Media
                        object
                        src={`https://robohash.org/${post.userId}?size=64x64`}
                        alt={`User ${post.userId}`}
                        className="rounded-circle img-fluid"
                      />
                    </Media>
                    <Media body className="ml-3">
                      <Media heading>{post.title}</Media>
                      <p>{post.body}</p>
                    </Media>
                  </Media>
                  <Comments postId={post.id} />
                  {renderPostButton(post)}
                </Card>
              </Col>
            ))}
        </Row>
      </Container>

      {displayedPosts < posts.length && (
        <div className="text-center mt-6">
          <Button
            color="primary"
            onClick={loadMorePosts}
            className="bg-blue-500 text-white hover:bg-blue-600 transition duration-300 px-6 py-3 rounded-full"
          >
            Load More
          </Button>
        </div>
      )}

      {showPaywall && (
        <PremiumUpgrade onUpgrade={() => setShowPaywall(false)} />
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
            <Button color="danger" className="mt-4" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Feed;
