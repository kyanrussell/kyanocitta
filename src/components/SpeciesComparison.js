import React from 'react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { pairDescriptions } from 'data/species';

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
  background-image: url('/kyanocitta/images/background.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  @media (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
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
  align-items: center;
  vertical-align: center;
  gap: 0.5rem;
  max-width: 100vw;
  max-height: 70vw;
  padding: 0 1rem;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: hidden;

  background-image: url('/kyanocitta/images/background.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const ImageContainer = styled.div`
  border-style: dotted;
  max-width: calc((100vw - 3 * rem - 2rem) / ${props => props.num_images});
  transform: scale(${props => props.scale});
  transform-origin: center center;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    max-width: ${({ num_images }) =>
      `calc((100vw - ${(num_images - 1)} * 0.75rem - 1rem) / ${num_images})`};
  }
`;

const Img = styled.img`
  display: block;
  border-style: solid;
`;

export default function FourImagesRow({ images }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    Promise.all(
      images.map(({ src }) => {
        return new Promise(resolve => {
          const img = new Image();
          img.onload = () => resolve(img.naturalWidth);
          img.src = src;
        });
      })
    ).then(widths => {
      const totalWidth = widths.reduce((sum, w) => sum + w, 0);
      const maxAvailableWidth = window.innerWidth - 150; // 100vw - padding
      const scaleFactor = Math.min(1, maxAvailableWidth / totalWidth);
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

const imageUrls=[
  {'src': '/kyanocitta/images/SOSH-dorsal.png', alt: 'foo'},
  {'src': '/kyanocitta/images/SOSH-ventral.png', alt: 'foo'},
  {'src': '/kyanocitta/images/SCMU-dorsal.png', alt: 'foo'},
  {'src': '/kyanocitta/images/SCMU-ventral.png', alt: 'foo'}
];

export const SpeciesComparison = ({ left, right, setRightId }) => {
  return (
    <>

    <FourImagesRow
      images={[
        { src: `/kyanocitta/images/${left.id}-dorsal.png`, alt: 'foo' },
        { src: `/kyanocitta/images/${left.id}-ventral.png`, alt: 'foo' },
        ...(right
          ? [
              { src: `/kyanocitta/images/${right.id}-dorsal.png`, alt: 'foo' },
              { src: `/kyanocitta/images/${right.id}-ventral.png`, alt: 'foo' },
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
