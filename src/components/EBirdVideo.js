import styled from "styled-components";

const VideoContainer = styled.div`
  width: 75vw;
  margin: 0 auto;
`;

const EBirdVideo = ({ mediaUrl }) => {
  return (mediaUrl &&
    <VideoContainer>
      <iframe
        src={mediaUrl}
        title="eBird Video Recording"
        height="502"
        width="640"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </VideoContainer>
  );
};

export default EBirdVideo;