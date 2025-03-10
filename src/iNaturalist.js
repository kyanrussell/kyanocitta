import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ObservationContainer = styled.a`
  width: 75vw;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const ObservationImage = styled.img`
  width: 75vw;
`;

const INaturalistWidget = ({ observationId }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const observationUrl = `https://www.inaturalist.org/observations/${observationId}`;

  useEffect(() => {
    const fetchObservation = async () => {
      try {
        const response = await fetch(`https://api.inaturalist.org/v1/observations/${observationId}`);
        const data = await response.json();
        
        if (data.results.length > 0) {
          setImageUrl(data.results[0].photos[0]?.url.replace("square", "original"));
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
      <ObservationImage src={imageUrl} alt="iNaturalist observation" />
    </ObservationContainer>
  );
};

export default INaturalistWidget;

