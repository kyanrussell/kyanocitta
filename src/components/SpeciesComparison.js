import React from 'react';
import styled from 'styled-components';
import { pairDescriptions } from 'data/species';

const DescriptionText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90vw;
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

export const SpeciesComparison = ({ left, right, setRightId }) => {
  return (
    <>
    <ComparisonGrid>

      <Cell>
        <img src={left.mainImageUrl} alt={left.name} width="100%" />
        <Label>{left.id}</Label>
      </Cell>
      {right && (
        <Cell>
          <img src={right.mainImageUrl} alt={right.name} width="100%" />
          <Label>{right.id}</Label>
        </Cell>
      )}

    </ComparisonGrid>
    <>
       <DescriptionText>
    <div style={{'font-weight': 'bold'}}>
      {right ? `${left.name} vs ${right.name}` : left.name}
    </div>
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
