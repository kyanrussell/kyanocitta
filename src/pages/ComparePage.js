import React, { useState } from 'react';
import styled from 'styled-components';
import { speciesData } from 'data/species';
import { SpeciesSelect } from 'components/SpeciesSelect';
import { SpeciesComparison } from 'components/SpeciesComparison';
import { Title, BlogPostContainer } from 'components/Styles';

const DropdownRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0 1rem;
`;


const ComparePage = () => {
  const [leftId, setLeftId] = useState(speciesData[0].id);
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
    { label: 'Similar species', species: similarSpecies },
    ...familyGroupings,
  ];
  const leftDropdownGroupings = familyGroupings;

  return (
    <BlogPostContainer>
      <Title>Compare Species</Title>

      <DropdownRow>
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
      </DropdownRow>

      <SpeciesComparison
        left={leftSpecies}
        right={rightSpecies}
        setRightId={setRightId}
      />
    </BlogPostContainer>
  );
};

export default ComparePage;
