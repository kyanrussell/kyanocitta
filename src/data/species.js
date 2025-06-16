import React from 'react';
import styled from 'styled-components';

const StyledLink = styled.a`
  color: #0077cc;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #004499;
  }
`;

export const CompareLink = ({ speciesId, setRightId, children }) => (
  <StyledLink
    href="#"
    onClick={(e) => {
      e.preventDefault();
      setRightId(speciesId);
    }}
  >
    {children}
  </StyledLink>
);



export const speciesData = [
// Waterfowl
  {
    id: 'SUSC',
    name: 'Surf Scoter',
    family: 'Waterfowl',
    scientificName: 'Melanitta perspicillata',
    mainImageUrl: '/kyanocitta/images/SUSC-main.png',
    flightPathImageUrl: 'foo',
    description: <>SUSC</>,
    breedingRange: 'foo',
    comparisonSpecies: ['COMU', 'TUPU'],
  },
// Cormorants
// Loons
// Grebes
// Alcids
  {
    id: 'COMU',
    name: 'Common Murre',
    family: 'Alcids',
    scientificName: 'Uria aalge',
    mainImageUrl: '/kyanocitta/images/COMU-main.png',
    flightPathImageUrl: 'foo',
    description: ({ setRightId }) => <>The "Flying Football." Looks pretty much like what you would picture from that moniker - a black and white football with stubby, whirring wings.
    Look for its black head (in alternate) or contrasting facial pattern (basic). Black above and white below - underside of wings can be variable.
    In harsh light - very white. In dim light - dusky to dark. Barring on the flanks (
        <CompareLink speciesId="TBMU" setRightId={setRightId}>
          c.f. TBMU
        </CompareLink>
     - clean flanks).
    Their abundance and distinctive structure + flightstyle makes for useful comparisons with other species.
    </>,
    breedingRange: 'Eastern Pacific and Western Atlantic',
    comparisonSpecies: ['RHAU', 'MASH', 'SCMU', 'MAMU', 'LTDU'],
  },
  // {
  //   id: 'TBMU',
  //   name: 'Thick-billed Murre',
  //   family: 'Alcids',
  //   scientificName: 'Uria lomvia',
  //   mainImageUrl: '/kyanocitta/images/TBMU-main.png',
  //   flightPathImageUrl: 'foo',
  //   description: <>TBMU</>,
  //   breedingRange: 'foo',
  //   comparisonSpecies: ['COMU'],
  // },
  {
    id: 'TUPU',
    name: 'Tufted Puffin',
    family: 'Alcids',
    scientificName: 'Fratercula cirrhata',
    mainImageUrl: '/kyanocitta/images/TUPU-main.png',
    flightPathImageUrl: '/kyanocitta/images/TUPU-flight-path.png',
    description: ({ setRightId }) => <>Resembles <CompareLink speciesId="SUSC" setRightId={setRightId}>
          SUSC
        </CompareLink> with no neck. Large, stocky, all-dark alcid. Beware <CompareLink speciesId="RHAU" setRightId={setRightId}>
          RHAU
        </CompareLink>s in dim light. In basic, look for hefty bill. Bill becomes brighter and larger in alternate, along with highly visible white facial plumage. Singles.
    </>,
    breedingRange: 'foo',
    comparisonSpecies: ['RHAU', 'SUSC'],
  },
  {
    id: 'CAAU',
    name: "Cassin's Auklet",
    family: 'Alcids',
    scientificName: 'Ptychoramphus aleuticus',
    mainImageUrl: '/kyanocitta/images/CAAU-main.png',
    flightPathImageUrl: '/kyanocitta/images/CAAU-flight-path.png',
    description: <>Cassin's Auklet</>,
    breedingRange: 'foo',
    comparisonSpecies: ['RHAU', 'ANMU'],
  },
  {
    id: 'RHAU',
    name: 'Rhinoceros Auklet',
    family: 'Alcids',
    scientificName: 'Cerorhinca monocerata',
    mainImageUrl: '/kyanocitta/images/RHAU-main.png',
    flightPathImageUrl: '/kyanocitta/images/RHAU-flight-path.png',
    description: ({ setRightId }) => <>At first glance, looks like a darker version of <CompareLink speciesId="COMU" setRightId={setRightId}>
          COMU
        </CompareLink>. Side by side, RHAU is slimmer, smaller, and pointier. Can appear all-dark in dim light, but better lighting reveals a white belly blending into the dusky breast.
        In alternate, orange bill and white facial tufts sometimes visible. Singles to small groups, occasionally large trains.
    </>,
    breedingRange: 'foo',
    comparisonSpecies: ['COMU', 'CAAU', 'TUPU'],
  },
  {
    id: 'PIGU',
    name: 'Pigeon Guillemot',
    family: 'Alcids',
    scientificName: 'Cepphus columba',
    mainImageUrl: '/kyanocitta/images/PIGU-main.png',
    flightPathImageUrl: 'foo',
    description: ({ setRightId }) => <> Breaks the alcid mold by being more common in summer. Sized between <CompareLink speciesId="COMU" setRightId={setRightId}>
          COMU
        </CompareLink> and murrelets. Plump-bodied with a tapered head. Bright red feet in all plumages visible when close. White wing patches visible in all plumages even at a distance.
        Otherwise all black in alternate; smudgy black and white in basic. Singles to small groups.

    </>,
    breedingRange: 'Eastern Pacific',
    comparisonSpecies: ['COMU', 'CAAU'],
  },
  {
    id: 'ANMU',
    name: 'Ancient Murrelet',
    family: 'Alcids',
    scientificName: 'Synthliboramphus antiquus',
    mainImageUrl: '/kyanocitta/images/ANMU-main.png',
    flightPathImageUrl: 'foo',
    description: <>Unique coloration among murrelets - in good light, their black head and white underparts contrast with the "peregrine blue" of the back.
    In dim lighting, can appear all dark above. The diagnostic white bill is surprisingly visible even at range. Singles to small groups.</>,
    breedingRange: 'Northeastern Pacific',
    comparisonSpecies: ['COMU', 'MAMU', 'SCMU'],
  },
  {
    id: 'SCMU',
    name: "Scripps's Murrelet",
    family: 'Alcids',
    scientificName: 'Synthliboramphus scrippsi',
    mainImageUrl: '/kyanocitta/images/SCMU-main.png',
    flightPathImageUrl: 'foo',
    description: <>foo</>,
    breedingRange: 'Eastern Pacific',
    comparisonSpecies: ['COMU', 'MAMU', 'ANMU'],
  },
  {
    id: 'MAMU',
    name: 'Marbled Murrelet',
    family: 'Alcids',
    scientificName: 'Brachyramphus marmoratus',
    mainImageUrl: '/kyanocitta/images/MAMU-main.png',
    flightPathImageUrl: 'foo',
    description: ({ setRightId }) => <>The first impression is that of speed - these small alcids blaze by easily twice as fast as other alcids.
    Half the size of <CompareLink speciesId="COMU" setRightId={setRightId}>
          COMU
        </CompareLink>; look for crisp black and white patterning. At a distance, the white scapulars and black underwings are reliable fieldmarks.
    Closer views offer inspection of the contrasting facial pattern with white collar. Singles and pairs.
    </>,
    breedingRange: 'Eastern Pacific',
    comparisonSpecies: ['COMU', 'ANMU', 'SCMU'],
  },
// Tubenoses
  // {
  //   id: 'LAAL',
  //   name: 'Laysan Albatross',
  //   family: 'Tubenoses',
  //   scientificName: 'Phoebastria immutabilis',
  //   mainImageUrl: '/kyanocitta/images/LAAL-main.png',
  //   flightPathImageUrl: 'foo',
  //   description: <>Laysan Albatross</>,
  //   breedingRange: 'foo',
  //   comparisonSpecies: ['BFAL', 'WEGU'],
  // },
  {
    id: 'BFAL',
    name: 'Black-footed Albatross',
    family: 'Tubenoses',
    scientificName: 'Phoebastria nigripes',
    mainImageUrl: '/kyanocitta/images/BFAL-main.png',
    flightPathImageUrl: 'foo',
    description: <>Black-footed Albatross</>,
    breedingRange: 'foo',
    comparisonSpecies: ['BRPE', 'PFSH'],
  },
  // {
  //   id: 'STAL',
  //   name: 'Short-tailed Albatross',
  //   family: 'Tubenoses',
  //   scientificName: 'Phoebastria albatrus',
  //   mainImageUrl: '/kyanocitta/images/STAL-main.png',
  //   flightPathImageUrl: 'foo',
  //   description: <>Short-tailed Albatross</>,
  //   breedingRange: 'foo',
  //   comparisonSpecies: ['BFAL', 'FFSH'],
  // },
  {
    id: 'NOFU',
    name: 'Northern Fulmar',
    family: 'Tubenoses',
    scientificName: 'Fulmarus glacialis',
    mainImageUrl: '/kyanocitta/images/NOFU-main.png',
    flightPathImageUrl: 'foo',
    description: <>
    This species is wide on all ends - the wings are broad-tipped, the head is blocky, and the tail is squared.
    Color forms may be distinct species - dark morph much more common. The contrast between the beak and facial plumage is often visible at a distance.
    Tends to wander in loose arcs, rather than repeatedly arcing in the same direction. More likely to double back than shearwaters. Stiff wingbeats, as if "flicking a fly off their wingtips."
    </>,
    breedingRange: 'foo',
    comparisonSpecies: ['WEGU', 'SOSH', 'STSH'],
  },
  // {
  //   id: 'COPE',
  //   name: "Cook's Petrel",
  //   family: 'Tubenoses',
  //   scientificName: 'Pterodroma cookii',
  //   mainImageUrl: '/kyanocitta/images/COPE-main.png',
  //   flightPathImageUrl: '/kyanocitta/images/COPE-flight-path.png',
  //   description: <>Cook's Petrel</>,
  //   breedingRange: 'foo',
  //   comparisonSpecies: ['BUSW', 'WEGU'],
  // },
  // {
  //   id: 'MUPE',
  //   name: "Murphy's Petrel",
  //   family: 'Tubenoses',
  //   scientificName: 'Pterodroma ultima',
  //   mainImageUrl: '/kyanocitta/images/MUPE-main.png',
  //   flightPathImageUrl: '/kyanocitta/images/MUPE-flight-path.png',
  //   description: <>Murphy's Petrel</>,
  //   breedingRange: 'foo',
  //   comparisonSpecies: ['SOSH'],
  // },
  {
    id: 'HAPE',
    name: 'Hawaiian Petrel',
    family: 'Tubenoses',
    scientificName: 'Pterodroma sandwichensis',
    mainImageUrl: '/kyanocitta/images/HAPE-main.png',
    flightPathImageUrl: '/kyanocitta/images/HAPE-flight-path.png',
    description: <>
    Fabulously rare from shore but appears to be increasing. White forehead surprisingly visible at range.
    Long narrow wings held crooked. Long tailed. In strong light, appears black above and white below.
    Better views reveal the gray back with dark M pattern, and the black ulnar bar on the white underwing.
    </>,
    breedingRange: 'foo',
    comparisonSpecies: ['MASH', 'SOSH', 'PFSH'],
  },
  {
    id: 'SOSH',
    name: 'Sooty Shearwater',
    family: 'Tubenoses',
    scientificName: 'Ardenna grisea',
    mainImageUrl: '/kyanocitta/images/SOSH-main.png',
    flightPathImageUrl: '/kyanocitta/images/SOSH-flight-path.png',
    description: <>
    Our most commonly seen shearwater gathers in the millions spring through autumn.
    Heavy body with stiff, thin wings. Flaps hard and often. All dark above, but beware molting birds with white highlights.
    Silver under wing gleams brightly in sun.
    </>,
    breedingRange: 'foo',
    comparisonSpecies: ['STSH', 'NOFU'],
  },
  {
    id: 'STSH',
    name: 'Short-tailed Shearwater',
    family: 'Tubenoses',
    scientificName: 'Ardenna tenuirostris',
    mainImageUrl: '/kyanocitta/images/STSH-main.png',
    flightPathImageUrl: '/kyanocitta/images/STSH-flight-path.png',
    description: <>Short-tailed Shearwater</>,
    breedingRange: 'foo',
    comparisonSpecies: ['SOSH', 'NOFU'],
  },
  {
    id: 'PFSH',
    name: 'Pink-footed Shearwater',
    family: 'Tubenoses',
    scientificName: 'Ardenna creatopus',
    mainImageUrl: '/kyanocitta/images/PFSH-main.png',
    flightPathImageUrl: '/kyanocitta/images/PFSH-flight-path.png',
    description: <>
    Large, broad-winged shearwater flies lazily in large arcs. Infrequent flapping. White underside can gleam in sun, 
    but look for smudgy marks under primaries. Some birds show a dark M dorsal pattern on a field of dark gray.
    </>,
    breedingRange: 'foo',
    comparisonSpecies: ['SOSH', 'BUSW', 'BVSH', 'FFSH'],
  },
  {
    id: 'FFSH',
    name: 'Flesh-footed Shearwater',
    family: 'Tubenoses',
    scientificName: 'Ardenna carneipes',
    mainImageUrl: '/kyanocitta/images/FFSH-main.png',
    flightPathImageUrl: '/kyanocitta/images/FFSH-flight-path.png',
    description: <>Flesh-footed Shearwater</>,
    breedingRange: 'foo',
    comparisonSpecies: ['PFSH', 'SOSH'],
  },
  {
    id: 'BUSW',
    name: "Buller's Shearwater",
    family: 'Tubenoses',
    scientificName: 'Ardenna bulleri',
    mainImageUrl: '/kyanocitta/images/BUSW-main.png',
    flightPathImageUrl: '/kyanocitta/images/BUSW-flight-path.png',
    description: <>Buller's Shearwater</>,
    breedingRange: 'foo',
    comparisonSpecies: ['PFSH', 'BVSH', 'MASH'],
  }, 
  {
    id: 'MASH',
    name: 'Manx Shearwater',
    family: 'Tubenoses',
    scientificName: 'Puffinus puffinus',
    mainImageUrl: '/kyanocitta/images/MASH-main.png',
    flightPathImageUrl: '/kyanocitta/images/MASH-flight-path.png',
    description: <>foo</>,
    breedingRange: 'foo',
    comparisonSpecies: ['BVSH', 'COMU'],
  },
  // {
  //   id: 'BVSH',
  //   name: 'Black-vented Shearwater',
  //   family: 'Tubenoses',
  //   scientificName: 'Puffinus opisthomelas',
  //   mainImageUrl: '/kyanocitta/images/STSH-main.png',
  //   flightPathImageUrl: '/kyanocitta/images/STSH-flight-path.png',
  //   description: <>Short-tailed Shearwater</>,
  //   breedingRange: 'foo',
  //   comparisonSpecies: ['PFSH', 'COMU'],
  // },
  // {
  //   id: 'WTSH',
  //   name: 'Wedge-tailed Shearwater',
  //   family: 'Tubenoses',
  //   scientificName: 'Ardenna pacifica',
  //   mainImageUrl: '/kyanocitta/images/WTSH-main.png',
  //   flightPathImageUrl: '/kyanocitta/images/WTSH-flight-path.png',
  //   description: <>Wedge-tailed Shearwater</>,
  //   breedingRange: 'foo',
  //   comparisonSpecies: ['PFSH', 'BUSW'],
  // },
  {
    id: 'WISP',
    name: "Wilson's Storm-Petrel",
    family: 'Tubenoses',
    scientificName: 'Oceanites oceanicus',
    mainImageUrl: '/kyanocitta/images/WISP-main.png',
    flightPathImageUrl: '/kyanocitta/images/WISP-flight-path.png',
    description: <>Wilson's Storm-Petrel</>,
    breedingRange: 'foo',
    comparisonSpecies: ['LCSP', 'ASSP'],
  },
  // {
  //   id: 'LCSP',
  //   name: "Leach's Storm-Petrel",
  //   family: 'Tubenoses',
  //   scientificName: 'Hydrobates leucorhous',
  //   mainImageUrl: '/kyanocitta/images/LCSP-main.png',
  //   flightPathImageUrl: '/kyanocitta/images/LCSP-flight-path.png',
  //   description: <>Leach's Storm-Petrel</>,
  //   breedingRange: 'foo',
  //   comparisonSpecies: ['ASSP', 'WISP'],
  // },
  {
    id: 'FTSP',
    name: 'Fork-tailed Storm-Petrel',
    family: 'Tubenoses',
    scientificName: 'Oceanodroma furcata',
    mainImageUrl: '/kyanocitta/images/FTSP-main.png',
    flightPathImageUrl: '/kyanocitta/images/FTSP-flight-path.png',
    description: <>Fork-tailed Storm-Petrel</>,
    breedingRange: 'foo',
    comparisonSpecies: ['REPH', 'RNPH', 'ASSP'],
  },
  {
    id: 'ASSP',
    name: 'Ashy Storm-Petrel',
    family: 'Tubenoses',
    scientificName: 'Hydrobates homochroa',
    mainImageUrl: '/kyanocitta/images/ASSP-main.png',
    flightPathImageUrl: '/kyanocitta/images/ASSP-flight-path.png',
    description: <>Ashy Storm-Petrel</>,
    breedingRange: 'foo',
    comparisonSpecies: ['BLSP'],
  },
  // {
  //   id: 'BLSP',
  //   name: 'Black Storm-Petrel',
  //   family: 'Tubenoses',
  //   scientificName: 'Hydrobates melania',
  //   mainImageUrl: '/kyanocitta/images/BLSP-main.png',
  //   flightPathImageUrl: '/kyanocitta/images/BLSP-flight-path.png',
  //   description: <>Black Storm-Petrel</>,
  //   breedingRange: 'foo',
  //   comparisonSpecies: ['ASSP'],
  // },
  // {
  //   id: 'LTSP',
  //   name: 'Least Storm-Petrel',
  //   family: 'Tubenoses',
  //   scientificName: 'Hydrobates microsoma',
  //   mainImageUrl: '/kyanocitta/images/LTSP-main.png',
  //   flightPathImageUrl: '/kyanocitta/images/LTSP-flight-path.png',
  //   description: <>Least Storm-Petrel</>,
  //   breedingRange: 'foo',
  //   comparisonSpecies: ['ASSP'],
  // },
  // {
  //   id: 'RFBO',
  //   name: 'Red-footed Booby',
  //   family: 'Sulids',
  //   scientificName: 'Sula sula',
  //   mainImageUrl: '/kyanocitta/images/RFBO-main.png',
  //   flightPathImageUrl: '/kyanocitta/images/RFBO-flight-path.png',
  //   description: <>Red-footed Booby</>,
  //   breedingRange: 'foo',
  //   comparisonSpecies: ['COBO'],
  // },
  {
    id: 'COBO',
    name: 'Cocos Booby',
    family: 'Sulids',
    scientificName: 'Sula brewsteri',
    mainImageUrl: '/kyanocitta/images/COBO-main.png',
    flightPathImageUrl: '/kyanocitta/images/COBO-flight-path.png',
    description: <>Cocos Booby</>,
    breedingRange: 'foo',
    comparisonSpecies: [],
  },
  // {
  //   id: 'MABO',
  //   name: 'Masked Booby',
  //   family: 'Sulids',
  //   scientificName: 'Sula dactylatra',
  //   mainImageUrl: '/kyanocitta/images/MABO-main.png',
  //   flightPathImageUrl: '/kyanocitta/images/MABO-flight-path.png',
  //   description: <>Masked Booby</>,
  //   breedingRange: 'foo',
  //   comparisonSpecies: [],
  // },
  // {
  //   id: 'NABO',
  //   name: 'Nazca Booby',
  //   family: 'Sulids',
  //   scientificName: 'Sula granti',
  //   mainImageUrl: '/kyanocitta/images/NABO-main.png',
  //   flightPathImageUrl: '/kyanocitta/images/NABO-flight-path.png',
  //   description: <>Nazca Booby</>,
  //   breedingRange: 'foo',
  //   comparisonSpecies: [],
  // },
  // {
  //   id: 'BFBO',
  //   name: 'Blue-footed Booby',
  //   family: 'Sulids',
  //   scientificName: 'Sula nebouxii',
  //   mainImageUrl: '/kyanocitta/images/BFBO-main.png',
  //   flightPathImageUrl: '/kyanocitta/images/BFBO-flight-path.png',
  //   description: <>Blue-footed Booby</>,
  //   breedingRange: 'foo',
  //   comparisonSpecies: [],
  // },
  // {
  //   id: 'BRPE',
  //   name: 'Brown Pelican',
  //   family: 'Pelicans',
  //   scientificName: 'Pelecanus occidentalis',
  //   mainImageUrl: '/kyanocitta/images/BRPE-main.png',
  //   flightPathImageUrl: '/kyanocitta/images/BRPE-flight-path.png',
  //   description: <>Brown Pelican</>,
  //   breedingRange: 'foo',
  //   comparisonSpecies: [],
  // },
// Skuas
  // {
  //   id: 'LTJA',
  //   name: 'Long-tailed Jaeger',
  //   family: 'Skuas',
  //   scientificName: 'Stercorarius longicaudus',
  //   mainImageUrl: '/kyanocitta/images/LTJA-main.png',
  //   flightPathImageUrl: '/kyanocitta/images/LTJA-flight-path.png',
  //   description: <>Long-tailed Jaeger</>,
  //   breedingRange: 'foo',
  //   comparisonSpecies: [],
  // },
  // {
  //   id: 'PAJA',
  //   name: 'Parasitic Jaeger',
  //   family: 'Skuas',
  //   scientificName: 'Stercorarius parasiticus',
  //   mainImageUrl: '/kyanocitta/images/PAJA-main.png',
  //   flightPathImageUrl: '/kyanocitta/images/PAJA-flight-path.png',
  //   description: <>Parasitic Jaeger</>,
  //   breedingRange: 'foo',
  //   comparisonSpecies: [],
  // },
  // {
  //   id: 'POJA',
  //   name: 'Pomarine Jaeger',
  //   family: 'Skuas',
  //   scientificName: 'Stercorarius pomarinus',
  //   mainImageUrl: '/kyanocitta/images/POJA-main.png',
  //   flightPathImageUrl: '/kyanocitta/images/POJA-flight-path.png',
  //   description: <>Pomarine Jaeger</>,
  //   breedingRange: 'foo',
  //   comparisonSpecies: [],
  // },
  // {
  //   id: 'SPSK',
  //   name: 'South Polar Skua',
  //   family: 'Skuas',
  //   scientificName: 'Stercorarius maccormicki',
  //   mainImageUrl: '/kyanocitta/images/SPSK-main.png',
  //   flightPathImageUrl: '/kyanocitta/images/SPSK-flight-path.png',
  //   description: <>South Polar Skua</>,
  //   breedingRange: 'foo',
  //   comparisonSpecies: [],
  // },
// Gulls and Terns
// Shorebirds
  {
    id: 'REPH',
    name: 'Red Phalarope',
    family: 'Shorebirds',
    scientificName: 'Phalaropus fulicarius',
    mainImageUrl: '/kyanocitta/images/REPH-main.png',
    flightPathImageUrl: '/kyanocitta/images/REPH-flight-path.jpeg',
    description: <>Red phalarope</>,
    breedingRange: 'Northeastern Pacific',
    comparisonSpecies: ['FTSP'],
  }
];

// IDs must be in alphabetical order
export const pairDescriptions = {
  "COMU_vs_PIGU": <>
  COMU vs PIGU
  </>,
  "COMU_vs_RHAU": <>
  The two most commonly encountered alcids. In dim light, both can appear all dark - in this case, look for structural differences. RHAU is slimmer with a shorter beak.
  </>,
  "RHAU_vs_TUPU": <>
  These birds are similarly sized and colored. TUPU has almost no neck compared to SUSC, and is stockier with a heftier bill.
  </>,
  "SUSC_vs_TUPU": <>
  Distant birds can be difficult to distinguish between these two species, especially in poor lighting. Look for structural differences - TUPU being larger and plumper, with a hefty
  rounded bill. In good lighting, the white belly of RHAU is diagnostic for this species pair.
  </>,
  "CAAU_vs_RHAU": <>
  These birds are similarly colored, but differ in structure. CAAU is half the size of RHAU with a larger head relative to its size.
  RHAU is slimmer and pointier. CAAU is a slower flier. CAAU is typically seen in singles or pairs, sometimes small groups.
  RHAUs are more likely to be seen in small groups to large trains.
  </>,
  "ANMU_vs_CAAU": <>
  Similarly sized and colored. Look for contrasting color between head and back of ANMU.
  The breast is dusky on CAAU and blends into the belly, whereas the black hood of ANMU is sharply demarcated. CAAU is a smaller flier.
  </>,
  "BUSW_vs_MASH": <>
  Both birds are gleaming white below - especially in harsh light. MASH is jet black above, while BUSW sports its distinctive black M pattern on a field of silver.
  More helpful are differences in size and flightstyle. BUSW is larger and floats like a butterfly due to its low wing-loading. MASH is heavy-bodied and flaps frequently.
  </>,
  "HAPE_vs_MASH": <>
  Both are similarly sized and proportioned; both are dark above and white below - particularly in harsh light. However, they differ greatly in flightstyle - the heavy-bodied 
  MASH flaps frantically with short glides, while HAPE holds its wings crooked and glides in sharply turning arcs.
  </>,
  "COMU_vs_MASH": <>
  Manx shearwaters can look surprisingly like Common murres - both are dark above and light below, with contrasting patterns on the face.
  However, a murre will never glide, whereas the fast, direct flapping of a Manx shearwater is typically interspersed with short glides.
  </>,
  "COMU_vs_MAMU": <>
  MAMU is half as big and twice as fast as COMU. Basic plumage COMU have a similar facial pattern to MAMU, but with a black collar instead of white.
  Black underwing and white scapulars of MAMU are distinctive.
  </>,
  "ANMU_vs_MAMU": <>
  Marbled murrelet distinctively flies twice as fast as similarly sized alcids. Look for the black underwings and white scapulars of MAMU.
  Both species feature a black face with white collar, but MAMU shows more white in front of the eye. Breeding plumage ANMU have a white eyebrow.
  </>,
  "FFSH_vs_PFSH": <>
  Some suggest these birds are conspecific. They are certainly identical in structure and flightstyle; distant, backlit birds may be best
  left unidentified. If possible, look for differences in color - cold gray tones of PFSH vs the chocolate brown of FFSH. The white underside
  of PFSH is diagnostic for this species pair.
  </>,
  "FFSH_vs_SOSH": <>
  The silvery underwing of SOSH is diagnostic. Both birds can appear all-dark, especially if you don't see the underside. Look for differences in structure: broad wings in FFSH
  vs narrow in SOSH. Differences in flightstyle are perhaps most obvious - FSSH is languid with large arcs and minimal flapping, vs the frantic flying of SOSH.
  </>,
  "PFSH_vs_SOSH": <>
  In a cloud of SOSH, PFSH is typically the next most common shearwater. Look for its large, broad wings with white undersides. The belly is also white, whereas in
  SOSH the white underside is limited to the wings. PFSH flaps infrequently with long glides - the period of its arcs appears longer than that of SOSH.
  </>,
  "BUSW_vs_PFSH": <>
  When looking for BUSW, it's best to make sure you're not looking at a PFSH. Especially heed PFSH with dark M patterns - this pattern is much higher contrast on BUSW.
  The underside of PFSH can appear quite bright in harsh light, but isn't as neatly bordered as in BUSW. Both birds appear languid in flight compared to heavier-bodied species,
  but BUSW appears much floatier, with more irregular arcing. BUSW is also slightly smaller.
  </>,
  "FTSP_vs_REPH": <>
  REPH vs FTSP
  </>
};
