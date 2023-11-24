import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Alert,
  Button,
  Card,
  CardBody,
  Input,
} from "reactstrap";
import { apiCalls } from "../../Data/Api";
import { getAuthToken } from "../../components/Auth/auth";
import { FaTrash, FaArchive } from "react-icons/fa";
import Comments from "./Comments";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const currentUser = getAuthToken();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        if (currentUser) {
          const userPostsResponse = await apiCalls.fetchPosts(currentUser.id);
          setPosts(userPostsResponse);
        }
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    fetchUserPosts();
  }, [currentUser]);

  const handleDelete = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);

    toast.success("Post deleted successfully!", { position: "top-right" });
  };

  const handleSend = (postId) => {
    toast.warning("System under maintenance. Please try again later.", {
      position: "top-right",
    });
  };

  const handleArchive = async () => {
    toast.success("Post Archived successfully!", { position: "top-right" });
  };

  return (
    <Container>
      {currentUser ? (
        <>
          <h2 className="mb-4">User Posts</h2>
          <Row className="mb-6">
            <Col>
              <Card
                className={`mb-4 fixed bottom-4 right-4 w-96 bg-white border-none rounded-lg shadow-lg ${
                  isChatOpen ? "chat-open" : "chat-closed"
                }`}
              >
                <CardBody>
                  <Button
                    color="primary"
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className={`chat-toggle-btn ${
                      isChatOpen ? "close-chat-btn" : "open-chat-btn"
                    }`}
                  >
                    {isChatOpen ? "Close Chat" : "Open Chat"}
                  </Button>
                  {isChatOpen && (
                    <>
                      <Input
                        type="text"
                        placeholder="Enter post title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="mb-4 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                      />
                      <Input
                        type="textarea"
                        placeholder="Enter post body"
                        value={newBody}
                        onChange={(e) => setNewBody(e.target.value)}
                        className="mb-4 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                      />
                      <Button
                        color="primary"
                        onClick={handleSend}
                        className="bg-blue-500 text-white hover:bg-blue-600 transition duration-300 px-6 py-2 rounded-full"
                      >
                        Send
                      </Button>
                    </>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>

          {posts.length > 0 ? (
            <>
              {posts.map((post) => (
                <Row key={post.id} className="mb-4">
                  <Col>
                    <div className="flex items-center space-x-2 mb-2">
                      <img
                        src={`https://robohash.org/${post.userId}?size=50x50`}
                        alt="User Avatar"
                        className="rounded-full overflow-hidden"
                      />
                      <div>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                      </div>
                    </div>
                    <Comments postId={post.id} />
                    <div className="flex items-center space-x-2">
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
                      >
                        <FaTrash size={20} color="red" className="mr-2" />
                      </Button>
                      <Button
                        color="warning"
                        size="sm"
                        onClick={() => handleArchive(post.id)}
                      >
                        <FaArchive size={20} className="mr-2" />
                      </Button>
                    </div>
                  </Col>
                </Row>
              ))}
            </>
          ) : (
            <Alert color="info">Loading...........</Alert>
          )}
        </>
      ) : (
        <Alert color="warning" className="text-center">
          Please log in to access your posts
        </Alert>
      )}

      {currentUser && (
        <div className="mt-4 text-center">
          <img
            src={`https://robohash.org/${currentUser.id}?size=200x200`}
            alt="User Avatar"
            className="rounded-full overflow-hidden mx-auto"
          />
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </Container>
  );
};

export default UserPosts;
