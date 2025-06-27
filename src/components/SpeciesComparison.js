import React from 'react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { pairDescriptions } from 'data/species';
import { ComparePage } from 'pages/seawatch/ComparePage';

const DescriptionTitle= styled.div`
  text-align: center;
  width: 80vw;
  margin: 0 auto;
  font-size: 1.5rem;
  font-weight: bold;
`;

const DescriptionText = styled.div`
  text-align: auto;
  width: 80vw;
  margin: 0 auto;
  font-size: 1.5rem;
`;

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  align-items: start;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  background-image: url('/kyanocitta/images/seawatch/background.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Label = styled.div`
  font-size: 0.75em;
  margin: auto;
`;

const Cell = styled.div`
  padding: 0.5rem 0;
`;

const getPairKey = (id1, id2) => {
  const [a, b] = [id1, id2].sort();
  return `${a}_vs_${b}`;
};


const Container = styled.div`
  display: flex;
  justify-content: center;

  max-width: 100vw;
  padding: 0 1rem;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: hidden;

  background-image: url('/kyanocitta/images/seawatch/background.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const ImageContainer = styled.div`
  max-height: 60vh;
  max-width: ${({ num_images }) =>
    `calc((100vw - ${(num_images - 1)} * 1rem - 2rem) / ${num_images})`};
  transform: scale(${props => props.scale});
  transform-origin: center center;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 600px) {
  max-height: 50vh;
    max-width: ${({ num_images }) =>
      `calc((100vw - ${(num_images - 1)} * 0.01rem - 1rem) / ${num_images})`};
  }
`;

const Img = styled.img`
  display: block;
`;

export function FourImagesRow({ images }) {
  const [scale, setScale] = useState(1);
  
  useEffect(() => {
    Promise.all(
      images.map(({ src }) => {
        return new Promise(resolve => {
          const img = new Image();
          img.onload = () =>
            resolve({ width: img.naturalWidth, height: img.naturalHeight });
          img.src = src;
        });
      })
    ).then(dimensions => {
      const totalWidth = dimensions.reduce((sum, { width }) => sum + width, 0);
      const maxHeight = Math.max(...dimensions.map(d => d.height));

      const maxAvailableWidth = window.innerWidth - 150; // account for padding
      const maxAvailableHeight = window.innerHeight * 0.5; // or whatever your container allows

      const scaleByWidth = maxAvailableWidth / totalWidth;
      const scaleByHeight = maxAvailableHeight / maxHeight;

      const scaleFactor = Math.min(1, scaleByWidth, scaleByHeight);
      setScale(scaleFactor);
    });
  }, [images]);

  return (
    <Container>
      {images.map(({ src, alt }, i) => (
        <ImageContainer key={i} scale={scale} num_images={images.length}>
          <Img src={src} alt={alt} />
        </ImageContainer>
      ))}
    </Container>
  );
}

export const SpeciesComparison = ({ left, right, setRightId }) => {
  return (
    <>

    <FourImagesRow
      images={[
        { src: `/kyanocitta/images/seawatch/${left.id}-dorsal.png`, alt: `${left.id} dorsal` },
        { src: `/kyanocitta/images/seawatch/${left.id}-ventral.png`, alt: `${left.id} ventral` },
        ...(right
          ? [
              { src: `/kyanocitta/images/seawatch/${right.id}-dorsal.png`, alt: `${right.id} dorsal` },
              { src: `/kyanocitta/images/seawatch/${right.id}-ventral.png`, alt: `${right.id} ventral` },
            ]
          : [])
      ]}
    />

    <>
       <DescriptionText>
          <DescriptionTitle>
            {right ? `${left.name} vs ${right.name}` : left.name}
          </DescriptionTitle>
          {(() => {
            const pairKey = getPairKey(left.id, right?.id);
            const desc = right ? pairDescriptions[pairKey] || `${left.id} vs ${right.id}` : left.description;

            return typeof desc === 'function' ? desc({ setRightId }) : desc;
          })()}
       </DescriptionText>
    </>
    </>
  );
};
