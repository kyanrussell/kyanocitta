import React, { useState } from 'react';
import styled from 'styled-components';
import { speciesData } from 'data/species';
import { SpeciesSelect } from 'components/SpeciesSelect';
import { SpeciesComparison } from 'components/SpeciesComparison';
import { Title, BlogPostContainer } from 'components/Styles';

const DropdownRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  padding: 0 1rem;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 600px) {
    flex-direction: row;
    align-items: stretch;
  }
`;

const DropdownColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: 601px) {
    flex-direction: row;
    gap: 0.75rem;
  }
`;

const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ComparePage = () => {

  const [leftId, setLeftId] = useState(speciesData[speciesData.length * Math.random() | 0].id);
  const [rightId, setRightId] = useState(null);

  const leftSpecies = speciesData.find((sp) => sp.id === leftId);
  const rightSpecies = speciesData.find((sp) => sp.id === rightId) || null;

  const handleComparisonClick = (id) => {
    setRightId(id);
  };

  const similarSpecies = leftSpecies?.comparisonSpecies?.map(
    (id) => speciesData.find((sp) => sp.id === id)
  ).filter(Boolean) || [];

  const groupedByFamily = {};
  for (const sp of speciesData) {
    if (!groupedByFamily[sp.family]) groupedByFamily[sp.family] = [];
    groupedByFamily[sp.family].push(sp);
  }

  const familyGroupings = Object.entries(groupedByFamily).map(([family, species]) => ({
    label: family,
    species,
  }));

  const rightDropdownGroupings = [
    { label: 'Similar species', species: similarSpecies }
  ];
  const leftDropdownGroupings = familyGroupings;

  return (
    <>
       <BlogPostContainer>
        <DropdownRow>
          <DropdownColumn>
            <SpeciesSelect
              speciesList={speciesData}
              value={leftId}
              onChange={setLeftId}
              groupings={leftDropdownGroupings}
              hideNullOption={true}
            />
            <SpeciesSelect
              speciesList={speciesData}
              value={rightId}
              onChange={setRightId}
              groupings={rightDropdownGroupings}
              hideNullOption={false}
            />
          </DropdownColumn>
          <SwitchWrapper>
            <button onClick={() => {
              if (rightId != null) {
                const temp = leftId;
                setLeftId(rightId);
                setRightId("");
              }
            }}>
              ⇄
            </button>
          </SwitchWrapper>
        </DropdownRow>

        <SpeciesComparison
          left={leftSpecies}
          right={rightSpecies}
          setRightId={setRightId}
        />
        </BlogPostContainer>
    </>
  );
};

export default ComparePage;
