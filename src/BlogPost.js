// src/BlogPost.js
import React from "react";

const BlogPost = ({ title, content, imageUrl }) => {
  return (
    <div className="post">
      {imageUrl && <img src={imageUrl} alt={title} />}
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
};

export default BlogPost;

