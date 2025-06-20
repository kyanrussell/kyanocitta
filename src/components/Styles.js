import React from "react";
import styled from 'styled-components';

export const BlogPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`

export const Title = styled.h1`
  width: 75vw;
  font-family: 'Arial', sans-serif;
  color: #1c3d5a;
`;

export const Heading = styled.h2`
  width: 75vw;
  font-family: 'Arial', sans-serif;
  color: #345d7e;
`;

export const H3 = styled.h3`
  width: 75vw;
  font-family: 'Arial', sans-serif;
  color: #345d7e;
`;

export const Body = styled.p`
  width: 75vw;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 16px;
`;

export const ImageContainer = styled.div`
  width: 75vw;
  object-it: scale-down;
  object-position: center;
`

export const Image = styled.img`
  width: 50vw;
  height: auto;
  display: block;
  margin: 0 auto;
  
  @media (max-width: 600px) {
    width: 75vw;
  }
`;