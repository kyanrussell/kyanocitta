import React from "react";
import './BlogPost.css';
import styled from 'styled-components';

const Heading = styled.h1`
  font-family: 'Arial', sans-serif;
  color: green;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 16px;
`;

const BlogPost = ({ title, content, imageUrl }) => {
  return (
    <div className="blog-post-container">
      <div className="image-container">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="content">
        <Heading>{title}</Heading>
        <Paragraph>{content}</Paragraph>
      </div>
    </div>
  );
};

export default BlogPost;
