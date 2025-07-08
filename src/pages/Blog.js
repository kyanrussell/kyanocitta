import React from "react";
import styled from 'styled-components';
import { INaturalistGallery } from 'components/iNaturalist';
import INaturalistWidget from 'components/iNaturalist';
import EBirdAudio from 'components/EBirdAudio';
import EBirdVideo from 'components/EBirdVideo';
import { BlogPostContainer, Title, Heading, DateHeading, Body, ImageContainer, Image } from 'components/Styles';

export const Caption = styled.div`
  font-size: 1em;
  text-align: center;

  @media (max-width: 600px) {
    max-width: 600px;
    font-size: 1em;
  }
`;

function Blog() {
  return (
      <BlogPostContainer>

        <Title>Sargent's Cypress on the South Coast</Title>
        <DateHeading>2025-07-07</DateHeading>
        <Body>
        We set out for the South Coast with only the vague goal of seeing Sargent's Cypress to guide our way. We trusted that this would be enough
        to see us through some spectacular habitat and indeed it was! Because of the Hwy 1 landslide, the only way south is via Nacimiento-Ferguson
        Rd. This recently reopened road takes you through oak savannah, into lush Nacimiento cañon, then up and over the Santa Lucias through burned foothills. The road
        crests at the shoulder of Cone Peak, and spits you out at the mouth of Kirk Creek. Driving a few miles south takes you to the foot of Will
        Creek Road, which takes you up the hills where it eventually intersects with the South Coast Ridge Road. Heading south takes you along the
        ridge past Alder Peak.
        </Body>

        <INaturalistGallery widgets = {[
            <INaturalistWidget observationId={296016432}/>,
            <INaturalistWidget observationId={296016373}/>,
            <INaturalistWidget observationId={296016374}/>,
        ]}
        ></INaturalistGallery>

        <Body>
        Cone Peak and its surrounding ridges loomed distractingly in the distance, but eventually we noticed that the closer hilltops and valleys sported
        a number of conifers. As we looked, we realized there were no fewer than eight conifer species within a five mile radius! The squat, pyramidal shape
        of Sargent's Cypress could be seen on a single distant rusty brown hill. Looking east, the golden hills sported the ghostly blue Gray Pines, as well as
        Coulter and Ponderosa Pines on the higher, greener slopes. The distant peaks of Cone and Pimkolam mountains to the north boasted Santa Lucia Firs and relictual Sugar
        Pines. The more verdant coastal drainages to the west were filled with Coast Redwoods and, surprisingly for me, Douglas Fir! Though we didn't see any, Incense Cedar
        and Knobcone Pine were more than likely in the area as well, adding up to ten different species. Nothing can match the eighteen species found in Klamath's
        "Miracle Mile," but this seems a respectable number for much of the United States, if not the world.
        </Body>

        <INaturalistGallery widgets = {[
            <INaturalistWidget observationId={296016419}/>,
            <INaturalistWidget observationId={296016414}/>,
            <INaturalistWidget observationId={296016413}/>,
            <INaturalistWidget observationId={296016406}/>,
            <INaturalistWidget observationId={296016380}/>,
            <INaturalistWidget observationId={296016372}/>,
        ]}
        ></INaturalistGallery>
        <Caption>
        Pollinators were abundant on Eriogonum fields.
        </Caption>

        <Body>
        Sargent, mistletoe, hairstreak, calochortus, serpentine
        </Body>
        <INaturalistGallery widgets = {[
            <INaturalistWidget observationId={296016399}/>,
            <INaturalistWidget observationId={296016429}/>,
            <INaturalistWidget observationId={296016430}/>,
            <INaturalistWidget observationId={296016403}/>,
            <INaturalistWidget observationId={296016388}/>,
            <INaturalistWidget observationId={296016396}/>,
        ]}
        ></INaturalistGallery>

        <Body>
        redwood grove
        </Body>
        <INaturalistGallery widgets = {[
            <INaturalistWidget observationId={296016368}/>,
            <INaturalistWidget observationId={296016364}/>,
            <INaturalistWidget observationId={296016360}/>,
            <INaturalistWidget observationId={296016363}/>,
            <INaturalistWidget observationId={296016371}/>,
        ]}
        ></INaturalistGallery>

        <Body>
        dipper
        </Body>
        <EBirdVideo mediaUrl='https://macaulaylibrary.org/asset/638591962'></EBirdVideo>

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

