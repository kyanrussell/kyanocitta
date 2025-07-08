import React from "react";
import styled from "styled-components";

const AudioContainer = styled.div`
  width: 75vw;
  margin: 0 auto;
`;

const EBirdAudio = ({ mediaUrl }) => {
  return (
    <AudioContainer>
      <iframe
        src={mediaUrl}
        title="eBird Audio Recording"
        height="431"
        width="100%"
        frameborder="0"
        allowFullScreen
      ></iframe>
    </AudioContainer>
  );
};

export default EBirdAudio;

