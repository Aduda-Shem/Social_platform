import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText, Button, Badge } from 'reactstrap';
import { apiCalls } from '../../Data/Api';

const Comment = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  useEffect(() => {
    apiCalls.fetchComments()
      .then((data) => setComments(data.slice(0, 3)));
  }, []);

  const handleLike = () => {
    setIsLiked(true);
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setIsDisliked(true);
    setDislikes(dislikes + 1);
  };

  const handleLoadMoreComments = () => {
    setShowAllComments(true);
  };

  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle tag="h5">{post.title}</CardTitle>
        <CardText>{post.body}</CardText>
        <h6>Comments:</h6>
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <Badge color="primary">{comment.name}</Badge>
            <p>{comment.body}</p>
          </div>
        ))}
        {showAllComments && (
          <Button color="secondary" size="sm" onClick={() => setShowAllComments(false)}>
            Hide Comments
          </Button>
        )}
        {!showAllComments && comments.length < 3 && (
          <Button color="primary" size="sm" onClick={handleLoadMoreComments}>
            View More Comments
          </Button>
        )}
        <hr />
        <div>
          <Button color="success" size="sm" onClick={handleLike} disabled={isLiked}>
            {isLiked ? '👍 Liked' : '👍 Like'}
          </Button>{' '}
          <Button color="danger" size="sm" onClick={handleDislike} disabled={isDisliked}>
            {isDisliked ? '👎 Disliked' : '👎 Dislike'}
          </Button>
          <span className="ml-2">
            Likes: {likes} | Dislikes: {dislikes}
          </span>
        </div>
      </CardBody>
    </Card>
  );
};

export default Comment;
