import React from "react";
import styled from 'styled-components';

const BlogPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`

const Title = styled.h1`
  width: 75vw;
  font-family: 'Arial', sans-serif;
  color: darkgreen;
`;

const Heading = styled.h2`
  width: 75vw;
  font-family: 'Arial', sans-serif;
  color: green;
`;

const Body = styled.p`
  width: 75vw;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 16px;
`;

const ImageContainer = styled.div`
  width: 75vw;
  object-it: scale-down;
  object-position: center;
`

const Image = styled.img`
  width: 75vw;
  height: auto;
  display: block;
  margin: 1rem 0;
`;

const BlogPost = ({ post }) => {
  return (
    <BlogPostContainer>
      {post.map((item, index) => {
        if (item.type === 'title') {
          return <Title key={index}>{item.content}</Title>;
        }
        if (item.type === 'heading') {
          return <Heading key={index}>{item.content}</Heading>;
        }
        if (item.type === 'body') {
          return <Body key={index}>{item.content}</Body>;
        }
        if (item.type === 'image') {
          return <ImageContainer key = {index}>
              <Image src={item.src} alt={item.alt} />
          </ImageContainer>
        }
      })}
    </BlogPostContainer>
  );
};

export default BlogPost;
