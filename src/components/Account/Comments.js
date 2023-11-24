import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, CardText, Button, Badge } from "reactstrap";
import { apiCalls } from "../../Data/Api";

const Comment = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  useEffect(() => {
    apiCalls.fetchComments().then((data) => setComments(data.slice(0, 3)));
  }, []);

  const handleLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikes(likes + 1);

      setIsDisliked(false);
      setDislikes(dislikes > 0 ? dislikes - 1 : 0);
    }
  };

  const handleDislike = () => {
    if (!isDisliked) {
      setIsDisliked(true);
      setDislikes(dislikes + 1);

      setIsLiked(false);
      setLikes(likes > 0 ? likes - 1 : 0);
    }
  };

  const handleLoadMoreComments = () => {
    setShowAllComments(true);
  };

  return (
    <Card className="mb-4 bg-gray-100 border border-gray-300 p-4">
      <CardBody>
        {post && post.title && (
          <CardTitle tag="h5" className="text-xl font-bold mb-2">
            {post.title}
          </CardTitle>
        )}
        {post && post.body && (
          <CardText className="text-gray-700 mb-4">{post.body}</CardText>
        )}
        <h6 className="font-semibold mb-2">Comments:</h6>
        {comments.map((comment) => (
          <div key={comment.id} className="comment mb-2">
            <div className="flex items-start">
              <Badge color="primary" className="mr-2">
                {comment.name || "Anonymous"}
              </Badge>
              <p className="text-gray-700">
                {comment.body || "No comment body available"}
              </p>
            </div>
          </div>
        ))}
        {showAllComments && (
          <Button
            color="secondary"
            size="sm"
            className="mt-2"
            onClick={() => setShowAllComments(false)}
          >
            Hide Comments
          </Button>
        )}
        {!showAllComments && comments.length < 3 && (
          <Button
            color="primary"
            size="sm"
            className="mt-2"
            onClick={handleLoadMoreComments}
          >
            View More Comments
          </Button>
        )}
        {!showAllComments && comments.length >= 3 && (
          <Button
            color="primary"
            size="sm"
            className="mt-2"
            onClick={handleLoadMoreComments}
          >
            Load More Comments
          </Button>
        )}
        <hr className="my-4 border-t border-gray-300" />
        <div className="flex items-center">
          <Button
            color="success"
            size="sm"
            onClick={handleLike}
            disabled={isLiked}
            className={`mr-2 ${isLiked ? "cursor-not-allowed" : ""}`}
          >
            {isLiked ? "👍 Liked" : "👍 Like"}
          </Button>{" "}
          <Button
            color="danger"
            size="sm"
            onClick={handleDislike}
            disabled={isDisliked}
            className={`mr-2 ${isDisliked ? "cursor-not-allowed" : ""}`}
          >
            {isDisliked ? "👎 Disliked" : "👎 Dislike"}
          </Button>
          <span className="ml-2 text-gray-500">
            Likes: {likes} | Dislikes: {dislikes}
          </span>
        </div>
      </CardBody>
    </Card>
  );
};

export default Comment;
