import React from 'react';

const Post = ({ data, showComments, children }) => {
  return (
    <div>
      <h3>{data.title}</h3>
      <p>{data.body}</p>
      {showComments && (
        <div>
          <h4>Comments:</h4>
          {children} 
        </div>
      )}
    </div>
  );
};

export default Post;
