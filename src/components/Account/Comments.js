import React, { useState, useEffect } from 'react';

const Comments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then((response) => response.json())
      .then((data) => setComments(data));
  }, []);

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.name}</strong> ({comment.email})
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
