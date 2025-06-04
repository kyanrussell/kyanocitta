import React from "react";
import styled from 'styled-components';
import INaturalistWidget from 'components/iNaturalist';
import EBirdAudio from 'components/EBirdAudio';
import { BlogPostContainer, Title, Heading, Body, ImageContainer, Image } from 'components/Styles';

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
        if (item.type === 'iNaturalist') {
          return <INaturalistWidget observationId={item.observation_id} />
        }
        if (item.type === 'eBirdAudio') {
          return <EBirdAudio mediaUrl={item.media_url} />
        }
      })}
    </BlogPostContainer>
  );
};

export default BlogPost;
