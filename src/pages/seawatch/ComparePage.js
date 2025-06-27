import React, { useState } from 'react';
import styled from 'styled-components';
import { useSearchParams } from "react-router";

import { speciesData, BellyColor, FlightStyle, FlightHeight, Size } from 'data/species';
import { SpeciesSelect } from 'components/SpeciesSelect';
import { SpeciesComparison } from 'components/SpeciesComparison';
import EBirdVideo from 'components/EBirdVideo';

const DropdownRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 0 1rem;
  width: 100%;
  max-width: 800px;
  margin: 0.25rem auto;
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

export const ComparisonGrid = styled.div`
  background-image: url('/kyanocitta/images/seawatch/background.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 0.5rem;
`;

export const Plate = styled.div`
  background-color: rgba(0, 0, 300, .1);
  padding: 0.5rem 0.5rem;
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
    max-width: 100px;
    font-size: 0.5em;
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ImageContainer = styled.img`
  max-width: 100px;
  padding: 0.1rem 0.1rem;

  @media (max-width: 600px) {
    max-width: 40px;
  }
`;

function ComparePage(props) {
  const leftId = props.leftId;
  const rightId = props.rightId;
  const setLeftId = props.setLeftId;
  const setRightId = props.setRightId;

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
        <DropdownRow>
          <SwitchWrapper>
            <button onClick={props.backToGrid}>
              🔙
            </button>
          </SwitchWrapper>
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
        <EBirdVideo mediaUrl={leftSpecies.mediaUrl}></EBirdVideo>
    </>
  );
};

const Page = () => {
  const [showParent, setShowParent] = useState(true); // State to control parent visibility
  const [showChild, setShowChild] = useState(false); // State to control child visibility

  const [leftId, setLeftId] = useState(speciesData[speciesData.length * Math.random() | 0].id);
  const [rightId, setRightId] = useState(null);

  const handleClick = (speciesId) => {
    setShowParent(false);
    setShowChild(true);
    setLeftId(speciesId);
  };

  const backToGrid = () => {
    setShowParent(true);
    setShowChild(false);
    setLeftId(null);
    setRightId(null);
  };

  const [filters, setFilters] = useState({
    bellyColor: '',
    flightStyle: '',
    flightHeight: '',
    size: '',
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredSpecies = speciesData.filter(species => {
    return (
      (!filters.bellyColor || species.bellyColor?.includes(filters.bellyColor)) &&
      (!filters.flightStyle || species.flightStyle?.includes(filters.flightStyle)) &&
      (!filters.flightHeight || species.flightHeight?.includes(filters.flightHeight)) &&
      (!filters.size || species.size?.includes(filters.size))
    );
  });


  return (
    <>
      {showParent && (
    <>
        <select style={{'width': '25%', 'margin': 'auto'}} value={filters.bellyColor} onChange={e => handleFilterChange('bellyColor', e.target.value)}>
          <option value="">Belly color</option>
          {Object.values(BellyColor).map(value => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>

        <select style={{'width': '25%', 'margin': 'auto'}} value={filters.flightStyle} onChange={e => handleFilterChange('flightStyle', e.target.value)}>
          <option value="">Flight Style</option>
          {Object.values(FlightStyle).map(value => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>

        <select style={{'width': '25%', 'margin': 'auto'}} value={filters.flightHeight} onChange={e => handleFilterChange('flightHeight', e.target.value)}>
          <option value="">Flight Height</option>
          {Object.values(FlightHeight).map(value => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>

        <select style={{'width': '25%', 'margin': 'auto'}} value={filters.size} onChange={e => handleFilterChange('size', e.target.value)}>
          <option value="">Size</option>
          {Object.values(Size).map(value => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
    <ComparisonGrid>
        {
          filteredSpecies.map(
            (species) => (
              <Plate onClick={() => handleClick(species.id)}>
              <ImageWrapper>
                <ImageContainer src={`/kyanocitta/images/seawatch/${species.id}-dorsal.png`} />
                <ImageContainer src={`/kyanocitta/images/seawatch/${species.id}-ventral.png`} />
              </ImageWrapper>
              <Caption>{species.name}</Caption>
              </Plate>
            )
          )
        }
    </ComparisonGrid>
    </>
      )}

      {showChild && <ComparePage backToGrid={backToGrid} leftId={leftId} setLeftId = {setLeftId} rightId={rightId} setRightId={setRightId} />}
    </>
  );
}

export default Page;
