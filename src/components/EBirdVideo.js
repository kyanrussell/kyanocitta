import styled from "styled-components";

import { BlogPostContainer, Title, Heading, Body} from 'components/Styles'

const VideoContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 75%;
  padding-top: 47%;
  @media (max-width: 600px) {
    padding-top: 85%;
  }
`;

const IFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  allow: fullscreen;
`

const EBirdVideo = ({ mediaUrl }) => {
  return (mediaUrl &&
    <VideoContainer>
      <IFrame
        src={mediaUrl + '/embed'}
        title="eBird Video Recording"
        frameborder="0"
        allowfullscreen
      ></IFrame>
    </VideoContainer>
  );
};

export default EBirdVideo;