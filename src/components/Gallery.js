import React, { useState, useEffect } from 'react';
import styled from "styled-components";

import { imageData, Categories } from 'data/images';

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  grid-template-rows: masonry;
  gap: 0.1rem;
  align-items: start;
  max-width: 100%;
  margin: 0 auto;
  padding: 0.1rem;
  background-color: rgba(11, 23, 87, 0.8);
  align-items: center;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Plate = styled.div`
  padding: 0.1rem 0.1rem;
  align-items: center;
  flex-direction: column;
  display: flex;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

export const Caption = styled.div`
  font-size: 0.9em;
  text-align: center;

  @media (max-width: 600px) {
    max-width: 600px;
    font-size: 0.5em;
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ImageContainer = styled.img`
  max-width: 500px;
  padding: 0.1rem 0.1rem;
  max-width: 100%;
  pointer-events: none;
`;


function Gallery(category) {
  return (
      <>
        <ComparisonGrid>
        {
          imageData.filter(image => image.tags.categories.includes(category))
          .map(
            (image) => (
              <Plate>
              <ImageWrapper>
                <ImageContainer src={image.filepath} />
              </ImageWrapper>
              <Caption>{image.caption}</Caption>
              </Plate>
            )
          )
        }
        </ComparisonGrid>
      </>
  );
}

export default Gallery;