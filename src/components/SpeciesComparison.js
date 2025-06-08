import React from 'react';
import styled from 'styled-components';
import { pairDescriptions } from 'data/species';

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  align-items: start;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;

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

export const SpeciesComparison = ({ left, right, setRightId }) => {
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

      <Cell>
        <img src={left.flightPathImageUrl} alt={left.name} width="100%" />
      </Cell>
      {right && (
        <Cell>
          <img src={right.flightPathImageUrl} alt={right.name} width="100%" />
        </Cell>
      )}

      <Cell>
        {(() => {
          const pairKey = getPairKey(left.id, right?.id);
          const desc = right ? pairDescriptions[pairKey] || left.description : left.description;

          return typeof desc === 'function' ? desc({ setRightId }) : desc;
        })()}
      </Cell>

    </ComparisonGrid>
  );
};
