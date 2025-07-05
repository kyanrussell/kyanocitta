import React from "react";
import styled from 'styled-components';
import { INaturalistGallery } from 'components/iNaturalist';
import INaturalistWidget from 'components/iNaturalist';
import EBirdAudio from 'components/EBirdAudio';
import EBirdVideo from 'components/EBirdVideo';
import { BlogPostContainer, Title, Heading, DateHeading, Body, ImageContainer, Image } from 'components/Styles';

export const Caption = styled.div`
  font-size: 1em;
  font-style: oblique;
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
        Bill, Francis, and I set out for the South Coast with only the vague goal of seeing Sargent's Cypress to guide our way. We trusted that this would be enough
        to see us through some spectacular habitat. Because of the Hwy 1 landslide, the only way south is via Nacimiento-Ferguson
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
        ]}/>
        <Caption>
        Pollinators were abundant on Eriogonum fields.
        </Caption>

        <Body>
        We eventually arrived at the grove after an hour on the narrow, dusty, overgrown, and occasionally steep and slippery road. It lay upon a saddle connecting two
        ridges. The divide was entirely comprised of serpentine in various colors - green where freshly exposed, sunbaked blueish-black, and burnt red crumbling to dust.
        There were a few large trees in pyramidal form but the majority comprised what could be a single-age stand, reminding me of the pygmy forests of Gowan's cypress in Del Monte Forest, Monterey, or those of Pygmy Cypress in Mendocino County. Cypresses are prone to edaphic speciation - each of these species (and many others) grow in distinct soil types - all containing few nutrients. Sargent's Cypress is endemic to serpentine exposures, and has a comparatively large but scattered range across coastal California.
        </Body>
        <INaturalistGallery widgets = {[
            <INaturalistWidget observationId={296016429}/>,
            <INaturalistWidget observationId={296016430}/>,
            <INaturalistWidget observationId={296016403}/>,
        ]}/>

        <Body>
        We explored the grove via the road that cut straight through it along the high point of the saddle. A small, distinct ecosystem like this rewards attention, so we scattered and looked at everything. The cypresses themselves had pale green foliage, and bore both yellow pollen cones and seed cones of all ages, ranging from waxy chestnut-colored young cones, gray woody mature cones, and some dried cones with seeds scattered. We noticed many were "afflicted" with leafy mistletoes. I had only seen this genus on oaks and creosotes before, but it turned out this particular species specializes on cypresses and junipers. Bill commented "Great Blue Hairstreak caterpillars feed on mistletoe," and lo - we saw an adult male a few minutes later! It fluttered from treetop to treetop, and eventually settled in a tree where we couldn't see it. I was able to snap a photo before we lost it, and you can see the "false head" in the photo above in an example of automimicry.
        </Body>
        <Body>
        We eventually tore ourselves away from the grove. We three each felt the quiet majesty of this tiny population of trees clinging to this remote sun-baked ridgetop. The cool ocean wind blew in from the west, carrying the voices of ash-throated flycatchers calling from the drainage below us. We spoke of the place as an altar, and promised to visit again.
        </Body>

        <Body>
        We rolled on to the Lion's Den Spring Botanical Area. We hiked out to the campsite, and I was amazed to find alders shading the spring in the middle of the dry golden hills. The spring was not much more than a trickly seep lined with rushes. Yet in the cold, clear water were caddisfly larvae and a dragonfly nymph. Bright blue Vivid dancers hovered nearby. The trail itself was thick with adult Western whiptails, showing a surprising variation in color ranging from dull brown to bright orange. I'm not sure if this is individual variation or if they are prone to color changes - I wouldn't be surprised if it were the latter. A flower I was happily surpised to see was Calochortus fimbriatus - a species I had heard of being present in South County - however, I hadn't realized that we would be in their country! Stunning golden orange, with dark maroon hairs fringing the edges and interior of the perianth, these flowers seemed to associate with Chaparral yucca. Most were found nearby yucca, or even resting upon but not quite twining along their spines. I wonder what, if anything, eats them?
        </Body>
        <INaturalistGallery widgets = {[
            <INaturalistWidget observationId={296016399}/>,
            <INaturalistWidget observationId={296016388}/>,
            <INaturalistWidget observationId={296016396}/>,
        ]}/>

        <Body>
        By now the heat and dry was getting to me. I was happy to get back down to sea level - the temperature dropped at least thirty degrees as we descended. Towards the bottom, we stopped in a redwood grove in the crook of the road. Immediately, the orange jellyfish flowers of a leopard lily jumped out at us amidst the green. The roots of a large redwood lining the creek were exposed by erosion, and I crawled into the space below the tree. Looking up, I saw stars. There were several large reddish growths on the underside of the redwood bole, each sporting an array of bright points. I wonder if they could be root tips?
        We rumbled on past a roadcut, and Bill said "this is now the habitat I look for Platanthera orchids in" - and immediately I said "stop the car!!" Indeed, we found some orchids poking out the exposed cut - Platanthera transversa!
        </Body>
        <INaturalistGallery widgets = {[
            <INaturalistWidget observationId={296016368}/>,
            <INaturalistWidget observationId={296016364}/>,
            <INaturalistWidget observationId={296016360}/>,
            <INaturalistWidget observationId={296016363}/>,
            <INaturalistWidget observationId={296016371}/>,
        ]}/>

        <Body>
        On our way down the coast, I briefly spotted an American Dipper as we drove past the mouth of Mill Creek. We returned here in the afternoon to see if it was still there. We didn't see it at first, but as we explored the rocky beach, Francis spotted it perched up on a sandstone bluff. It then flew down to where the creek emptied into the sea, and seemed quite at home foraging only a few meters from crashing waves. Quite an odd sight!
        </Body>
        <EBirdVideo mediaUrl='https://macaulaylibrary.org/asset/638591962'></EBirdVideo>

        <Title>Ovenbird on Alert</Title>
        <DateHeading>2025-07-03</DateHeading>
        <EBirdVideo mediaUrl='https://macaulaylibrary.org/asset/638405485'></EBirdVideo>
        <Body>
        One of the birds I wanted to see the most on my first birding trip to the East Coast was an Ovenbird. Being pretty skulky
        warblers that typically stay low to the ground, I wasn't expecting great views. Yet, as we walked along Shindagin Hollow Road,
        we saw this bird at eye level in a tree. It stayed in one spot, walking along the branch and constantly chipping and flaring
        its crest - which I definitely didn't expect to see! Later, I found out we must have been near its nest, and it was attempting
        to distract us. It certainly worked!
        </Body>

        <INaturalistGallery widgets = {[
            <INaturalistWidget observationId={294903328}/>,
            <INaturalistWidget observationId={294903335}/>,
            <INaturalistWidget observationId={294903332}/>,
            <INaturalistWidget observationId={294903345}/>,
            <INaturalistWidget observationId={294903284}/>,
            <INaturalistWidget observationId={294903330}/>,
            <INaturalistWidget observationId={294903315}/>,
            <INaturalistWidget observationId={294903309}/>,
            <INaturalistWidget observationId={294903310}/>,
        ]}/>

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

        <INaturalistGallery widgets = {[
            <INaturalistWidget observationId={285371038}/>,
            <INaturalistWidget observationId={285371002}/>,
            <INaturalistWidget observationId={285370967}/>,
            <INaturalistWidget observationId={285370963}/>,
            <INaturalistWidget observationId={285370929}/>,
            <INaturalistWidget observationId={285370879}/>,
            <INaturalistWidget observationId={285370927}/>,
        ]}/>

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

        <Title>Heart of Ventana</Title>
        <DateHeading>2025-04-03</DateHeading>
        <Body>
        The Ventana Wilderness is a maze of ridges and creeks. Yet the crest of the Double Cone, the central and tallest peak of the Wilderness, remains visible from all of the other ridges. Having seen it from practically all angles, I began to wonder how I might visualize the landscape differently. I had previously been thinking of it as a series of mountains - instead, I sought to see it from the perspective of its waters.
        </Body>
        <Body>
        I first found some USGS elevation data online, and charted it with matplotlib. I found a library for calculating watersheds, and applied it to produce the following chart.
        </Body>
        <ImageContainer>
          <Image src='/kyanocitta/images/ventana_maps/water_graph.jpeg' alt="" />
        </ImageContainer>
        <Body>
        I tinkered with the colors and z-levels of the contours to simplify the visual data.
        </Body>
        <ImageContainer>
          <Image src='/kyanocitta/images/ventana_maps/water_topo_chart.jpeg' alt="" />
        </ImageContainer>
        <Body>
        As a bonus, I manually shaded the different watersheds of the Big Sur (green), Little Sur (red), Carmel (blue), and Salinas (yellow) rivers, with the red lines marking the divides.
        </Body>
        <ImageContainer>
          <Image src='/kyanocitta/images/ventana_maps/color_watershed.jpeg' alt="" />
        </ImageContainer>
        <Body>
        I then loosely copied the image onto paper with a felt tip pen.
        </Body>
        <ImageContainer>
          <Image src='/kyanocitta/images/ventana_maps/pen.jpeg' alt="" />
        </ImageContainer>
        <Body>
        I scanned the image and colored the rivers.
        </Body>
        <ImageContainer>
          <Image src='/kyanocitta/images/ventana_maps/light_final.jpeg' alt="" />
        </ImageContainer>
        <Body>
        A value-swapped version.
        </Body>
        <ImageContainer>
          <Image src='/kyanocitta/images/ventana_maps/dark_final.jpeg' alt="" />
        </ImageContainer>
        <Body>
        The Pine Ridge Trail is shown in red, with peaks in pink.
        </Body>
        <ImageContainer>
          <Image src='/kyanocitta/images/ventana_maps/map_with_camps.jpeg' alt="" />
        </ImageContainer>
        <Body>
        I then wondered if different tree species could be mapped to distinct elevations and watersheds. I grabbed observation data from iNaturalist of a few different conifer species, and plotted them against the topographic map.
        </Body>
        <ImageContainer>
          <Image src='/kyanocitta/images/ventana_maps/tree_chart.jpeg' alt="" />
        </ImageContainer>
        <Body>
        Plotting the observation counts against elevation data produces the following, revealing the preferences of certain species.
        </Body>
        <ImageContainer>
          <Image src='/kyanocitta/images/ventana_maps/tree_line_chart.jpeg' alt="" />
        </ImageContainer>
        <Body>
        Finally, I drafted a sketch of a graphic that could better illustrate the altitudinal spread of each species.
        </Body>
        <ImageContainer>
          <Image src='/kyanocitta/images/ventana_maps/tree_graph.jpeg' alt="" />
        </ImageContainer>


      </BlogPostContainer>
  );
}

export default Blog;

