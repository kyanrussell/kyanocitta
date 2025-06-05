import React from 'react';

export const speciesData = [
  {
    id: 'common-murre',
    name: 'Common Murre',
    family: 'Alcids',
    scientificName: 'Uria aalge',
    mainImageUrl: '/kyanocitta/images/common-murre-main.png',
    flightPathImageUrl: 'foo',
    description: ({ setRightId }) => <>The "Flying Football." Looks pretty much like what you would picture from that moniker - a black and white football with stubby, whirring wings.
    Look for its black head (in alternate) or contrasting facial pattern (basic). Black above and white below - underside of wings can be variable.
    In harsh light - very white. In dim light - dusky to dark. Barring on the flanks (
        <CompareLink speciesId="common-murre" setRightId={setRightId}>
          c.f. TBMU
        </CompareLink>
     - clean flanks).
    Their abundance and distinctive structure + flightstyle makes for useful comparisons with other species.
    </>,
    breedingRange: 'Eastern Pacific and Western Atlantic',
    comparisonSpecies: ['pigeon-guillemot', 'ancient-murrelet', 'marbled-murrelet'],
  },
  {
    id: 'pigeon-guillemot',
    name: 'Pigeon Guillemot',
    family: 'Alcids',
    scientificName: 'Cepphus columba',
    mainImageUrl: '/kyanocitta/images/pigeon-guillemot-main.png',
    flightPathImageUrl: 'foo',
    description: <>A striking black seabird with red feet.</>,
    breedingRange: 'Eastern Pacific',
    comparisonSpecies: ['common-murre'],
  },
  {
    id: 'ancient-murrelet',
    name: 'Ancient Murrelet',
    family: 'Alcids',
    scientificName: 'Synthliboramphus antiquus',
    mainImageUrl: '/kyanocitta/images/ancient-murrelet-main.png',
    flightPathImageUrl: 'foo',
    description: <>foo</>,
    breedingRange: 'Northeastern Pacific',
    comparisonSpecies: ['common-murre', 'pigeon-guillemot', 'marbled-murrelet'],
  },
  {
    id: 'scrippss-murrelet',
    name: "Scripps's Murrelet",
    family: 'Alcids',
    scientificName: 'Synthliboramphus scrippsi',
    mainImageUrl: '/kyanocitta/images/scrippss-murrelet-main.png',
    flightPathImageUrl: 'foo',
    description: <>foo</>,
    breedingRange: 'Eastern Pacific',
    comparisonSpecies: ['common-murre', 'pigeon-guillemot', 'marbled-murrelet'],
  },
  {
    id: 'marbled-murrelet',
    name: 'Marbled Murrelet',
    family: 'Alcids',
    scientificName: 'Brachyramphus marmoratus',
    mainImageUrl: '/kyanocitta/images/marbled-murrelet-main.png',
    flightPathImageUrl: 'foo',
    description: <>foo</>,
    breedingRange: 'Eastern Pacific',
    comparisonSpecies: ['common-murre', 'pigeon-guillemot', 'ancient-murrelet'],
  },
  {
    id: 'manx-shearwater',
    name: 'Manx Shearwater',
    family: 'Shearwaters',
    scientificName: 'Puffinus puffinus',
    mainImageUrl: 'manx-shearwater-main.png',
    flightPathImageUrl: '/kyanocitta/images/manx-shearwater-main.png',
    description: <>foo</>,
    breedingRange: 'Eastern and Western Atlantic',
    comparisonSpecies: ['common-murre', 'black-vented-shearwater'],
  },
  {
    id: 'black-vented-shearwater',
    name: 'Black-vented Shearwater',
    family: 'Shearwaters',
    scientificName: 'Puffinus opisthomelas',
    mainImageUrl: '/kyanocitta/images/black-vented-shearwater-main.png',
    flightPathImageUrl: 'foo',
    description: <>foo</>,
    breedingRange: 'Eastern Pacific',
    comparisonSpecies: ['common-murre', 'black-vented-shearwater'],
  },
  {
    id: 'red-phalarope',
    name: 'Red Phalarope',
    family: 'Shorebirds',
    scientificName: 'Phalaropus fulicarius',
    mainImageUrl: '/kyanocitta/images/red-phalarope-main.jpeg',
    flightPathImageUrl: '/kyanocitta/images/red-phalarope-flight-path.jpeg',
    description: <>Red phalarope</>,
    breedingRange: 'Northeastern Pacific',
    comparisonSpecies: ['fork-tailed-storm-petrel'],
  },
  {
    id: 'fork-tailed-storm-petrel',
    name: 'Fork-tailed Storm-petrel',
    family: 'Storm-petrels',
    scientificName: 'Oceanodroma furcata',
    mainImageUrl: '/kyanocitta/images/fork-tailed-storm-petrel-main.jpeg',
    flightPathImageUrl: '/kyanocitta/images/fork-tailed-storm-petrel-flight-path.jpeg',
    description: <>Fork-tailed storm-petrel</>,
    breedingRange: 'Eastern Pacific',
    comparisonSpecies: ['red-phalarope'],
  },
];

export const pairDescriptions = {
  "common-murre_vs_pigeon-guillemot": "COMU vs PIGU",
  "common-murre_vs_manx-shearwater": "Manx shearwaters can look surprisingly like Common murres - both are dark above and light below, with contrasting patterns on the face. However, a murre will never glide, whereas the fast, direct flapping of a Manx shearwater is typically interspersed with short glides.",
  "red-phalarope_vs_fork-tailed-storm-petrel": "REPH vs FTSP"
};
