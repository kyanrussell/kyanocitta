import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  grid-template-rows: masonry;
  align-items: center;
  gap: 1.53rem;
  max-width: 100%;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: rgba(11, 23, 87, 0.4);

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
`

const ObservationContainer = styled.a`
  width: 75vw;
  max-width: 25vw;
  border-radius: 8px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }


  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    max-width: 100vw;
  }
`;

const ObservationImage = styled.img`
  width: 75vw;
  max-width: 25vw;

  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    max-width: 100vw;
  }
`;

export const Caption = styled.div`
  font-size: 1em;
  text-align: center;

  @media (max-width: 600px) {
    max-width: 600px;
    font-size: 1em;
  }
`;

export const INaturalistUserObservations = ({ user_name }) => {
  console.log(user_name);
  const [imageIds, setImageIds] = useState(null);
  const observationUrl = `https://api.inaturalist.org/v1/observations?user_id=${user_name}`;

  useEffect(() => {
    const fetchObservation = async () => {
      try {
        const response = await fetch(`https://api.inaturalist.org/v1/observations?user_id=${user_name}`);
        const data = await response.json();
        
        if (data.results.length > 0) {
          setImageIds( 
            data.results.map(
              (result) => (
                result.id
              )
            ).slice(0, 10)
          );
        }
      } catch (error) {
        console.error("Error fetching iNaturalist data:", error);
      }
    };

    fetchObservation();
  }, [user_name]);

  if (!imageIds) return <p>Loading...</p>;

  return (
      <INaturalistGallery
          widgets={imageIds.map((id) => (
              <React.Fragment key={id}>
                  <INaturalistWidget observationId={id} />
              </React.Fragment>
          ))}
      ></INaturalistGallery>
  );
};

export const INaturalistGallery = ({ widgets }) => {
  return (
    <ComparisonGrid>
        {widgets}
    </ComparisonGrid>
  );
};

export const INaturalistWidget = ({ observationId }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [taxaName, setTaxaName] = useState(null);
  const observationUrl = `https://www.inaturalist.org/observations/${observationId}`;

  useEffect(() => {
    const fetchObservation = async () => {
      try {
        const response = await fetch(`https://api.inaturalist.org/v1/observations/${observationId}`);
        const data = await response.json();
        
        if (data.results.length > 0) {
          setImageUrl(data.results[0].photos[0]?.url.replace("square", "original"));
          setTaxaName(data.results[0].species_guess);
        }
      } catch (error) {
        console.error("Error fetching iNaturalist data:", error);
      }
    };

    fetchObservation();
  }, [observationId]);

  if (!imageUrl) return <p>Loading...</p>;

  return (
    <ObservationContainer href={observationUrl} target="_blank" rel="noopener noreferrer">
      <ObservationImage src={imageUrl} alt="taxaName" />
      <Caption>{taxaName}</Caption>
    </ObservationContainer>
  );
};

export default INaturalistWidget;

