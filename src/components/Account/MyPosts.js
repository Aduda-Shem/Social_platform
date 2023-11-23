import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Button, Input, Card, CardBody } from 'reactstrap';
import { apiCalls } from '../../Data/Api';
import { getAuthToken } from '../../components/Auth/auth';
import { FaTrash, FaArchive, FaPaperPlane } from 'react-icons/fa';
import Comments from './Comments';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const UserPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const user = getAuthToken();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await apiCalls.fetchPosts(user.id);
        setUserPosts(response);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    if (user) {
      fetchUserPosts();
    } else {
      console.log('User data not available.');
    }
  }, [user]);

  const handleDeletePost = (postId) => {
    const updatedPosts = userPosts.filter((post) => post.id !== postId);
    setUserPosts(updatedPosts);

    toast.success('Post deleted successfully!', { position: 'bottom-right' });
  };

  const handleArchivePost = (postId) => {
    console.log(`Archive post with ID: ${postId}`);

    toast.info('Post archived!', { position: 'bottom-right' });
  };

  const handleSendPost = async () => {
    if (!newPostTitle.trim() || !newPostBody.trim()) {
      toast.error('Please enter both title and body for the new post!', { position: 'bottom-right' });
      return;
    }

    const newPost = {
      userId: user.id,
      title: newPostTitle.trim(),
      body: newPostBody.trim(),
    };

    try {
      const response = await apiCalls.createPost(newPost);
      setUserPosts([...userPosts, response]);

      toast.success('Post created successfully!', { position: 'bottom-right' });

      setNewPostTitle('');
      setNewPostBody('');
    } catch (error) {
      console.error('Error creating new post:', error);
      toast.error('Error creating new post. Please try again later.', { position: 'bottom-right' });
    }
  };

  return (
    <Container>
      <h2 className="mb-4">User Posts</h2>
      <Row className="mb-4">
        <Col>
          <Card className="mb-4">
            <CardBody>
              <Input
                type="text"
                placeholder="Enter post title"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                className="mb-2"
              />
              <Input
                type="textarea"
                placeholder="Enter post body"
                value={newPostBody}
                onChange={(e) => setNewPostBody(e.target.value)}
                className="mb-2"
              />
              <Button color="primary" onClick={handleSendPost}>
                <FaPaperPlane className="mr-2" /> Send Post
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {userPosts.length > 0 ? (
        <>
          {userPosts.map((post) => (
            <Row key={post.id} className="mb-4">
              <Col>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <Comments postId={post.id} />
                <div className="flex items-center space-x-2">
                  <Button color="danger" size="sm" onClick={() => handleDeletePost(post.id)}>
                    <FaTrash size={20} color="red" className="mr-2" />
                  </Button>
                  <Button color="warning" size="sm" onClick={() => handleArchivePost(post.id)}>
                    <FaArchive size={20} className="mr-2" />
                  </Button>
                </div>
              </Col>
            </Row>
          ))}
        </>
      ) : (
        <Alert color="info">No posts found for the user.</Alert>
      )}

      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />
    </Container>
  );
};

export default UserPosts;
