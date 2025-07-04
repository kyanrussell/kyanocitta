import React from "react";
import styled from 'styled-components';
import INaturalistWidget from 'components/iNaturalist';
import EBirdAudio from 'components/EBirdAudio';
import EBirdVideo from 'components/EBirdVideo';
import { BlogPostContainer, Title, Heading, DateHeading, Body, ImageContainer, Image } from 'components/Styles';

function Blog() {
  return (
      <BlogPostContainer>
        <Title>Ovenbird on Alert</Title>
        <DateHeading>2025-07-03</DateHeading>
        <EBirdVideo mediaUrl='https://macaulaylibrary.org/asset/638405485'></EBirdVideo>
        <Body>
        One of the birds I wanted to see the most on my first birding trip to the East Coast was an Ovenbird. Being pretty skulky
        warblers that typically stay low to the ground, I wasn't expecting great views. Yet, as we walked along Shindagin Hollow Road,
        we saw this bird at eye level in a tree. It stayed in one spot, walking along the branch and constantly chipping and flairing
        its crest - which I definitely didn't expect to see! Later, I found out we must have been near its nest, and it was attempting
        to distract us. It certainly worked!
        </Body>

        <Title>Variation in Facial Plumage of Murphy's Petrels</Title>
        <DateHeading>2025-05-11</DateHeading>
        <ImageContainer>
          <Image src='/kyanocitta/images/mupe.jpg' alt="Variation in Facial Plumage of Murphy's Petrels" />
        </ImageContainer>
        <Body>
        On a pelagic trip with Peter Pyle and Anchor Charters out of Fort Bragg, we had the opportunity to observe
        over 60 Murphy's petrels (Pterodroma ultima). These birds flew quite close to the boat, offering the chance to observe
        the variation in facial plumage. Most books I own show the white feathers being brightest on the chin, but the white
        feathers on some of these birds extended into the lores and even the forehead and behind the eye.
        </Body>

        <Title>Watsonville Thick-billed Kingbird</Title>
        <DateHeading>2025-03-09</DateHeading>
        <INaturalistWidget observationId={264731238}></INaturalistWidget>
        <Body>
        Last night I did a double-take while looking at recent iNaturalist observations for the Central Coast. A kingbird with a
        large bill.. Something that I'd never seen in person before but spent hours studying and searching for in Arizona -
        specifically last May (2024) when we visited the Paton Center - a Thick-billed kingbird! I checked eBird and there it was -
        found by Max Ferrero on March 8, 2025 on Peckham Road. Funnily enough, I had just driven on this road the previous week on
        the way to Mount Madonna. We probably cruised right past it!
        </Body>
      </BlogPostContainer>
  );
}

export default Blog;

