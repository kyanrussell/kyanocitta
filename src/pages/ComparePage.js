import React, { useState } from 'react';
import speciesData from '../data/species.json';
import { SpeciesSelect } from '../components/SpeciesSelect';
import { SpeciesComparison } from '../components/SpeciesComparison';

const ComparePage = () => {
  const [leftId, setLeftId] = useState(speciesData[0].id);
  const [rightId, setRightId] = useState(speciesData[1].id);

  const leftSpecies = speciesData.find((sp) => sp.id === leftId);
  const rightSpecies = speciesData.find((sp) => sp.id === rightId);

  return (
    <div>
      <h1>Compare Seabird Species</h1>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <SpeciesSelect speciesList={speciesData} value={leftId} onChange={setLeftId} />
        <SpeciesSelect speciesList={speciesData} value={rightId} onChange={setRightId} />
      </div>
      <SpeciesComparison left={leftSpecies} right={rightSpecies} />
    </div>
  );
};

export default ComparePage;

