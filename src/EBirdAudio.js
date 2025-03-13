import React from "react";
import styled from "styled-components";

const AudioContainer = styled.div`
`;

const EBirdAudio = ({ mediaUrl }) => {
  return (
    <AudioContainer>
      <iframe
        src={mediaUrl}
        title="eBird Audio Recording"
        height="431"
        width="640"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </AudioContainer>
  );
};

export default EBirdAudio;

