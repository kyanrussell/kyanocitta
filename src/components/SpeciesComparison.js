import React from 'react';
import styled from 'styled-components';
import { pairDescriptions } from 'data/species';

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  align-items: start;
  max-width: 50vh;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.div`
  font-weight: bold;
`;

const Cell = styled.div`
  padding: 0.5rem 0;
`;

const getPairKey = (id1, id2) => {
  const [a, b] = [id1, id2].sort();
  return `${a}_vs_${b}`;
};

export const SpeciesComparison = ({ left, right }) => {
  return (
    <ComparisonGrid>

      <Cell>
        <img src={left.mainImageUrl} alt={left.name} width="100%" />
      </Cell>
      {right && (
        <Cell>
          <img src={right.mainImageUrl} alt={right.name} width="100%" />
        </Cell>
      )}


      <Label>Flight Path</Label>
      <Cell>
        <img src={left.flightPathImageUrl} alt={left.name} width="100%" />
      </Cell>
      {right && (
        <Cell>
          <img src={right.flightPathImageUrl} alt={right.name} width="100%" />
        </Cell>
      )}

      <Label>Description</Label>
      <Cell>
        {right ? pairDescriptions[getPairKey(left.id, right.id)] || left.description: left.description}
      </Cell>

    </ComparisonGrid>
  );
};
