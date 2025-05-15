import BlogPost from "components/BlogPost";

const posts = [
[
  {
    type: 'title',
    content: "Variation in Facial Plumage of Murphy's Petrels",
  },
  {
    type: 'image',
    src: "/kyanocitta/images/mupe.jpg",
    alt: 'Another image',
  },
  {
    type: 'body',
    content: "On a May 11th pelagic trip with Peter Pyle and Anchor Charters out of Fort Bragg, we had the opportunity to observe over 60 Murphy's petrels (Pterodroma ultima). These birds flew quite close to the boat, offering the chance to observe the variation in facial plumage. Most books I own show the white feathers being brightest on the chin, but the white feathers on some of these birds extended into the lores and even the forehead and behind the eye.",
  },
],
[
  {
    type: 'title',
    content: 'Westerly at the Harbor',
  },
  {
    type: 'iNaturalist',
    observation_id: 265781782,
  },
  {
    type: 'iNaturalist',
    observation_id: 265781805,
  },
  {
    type: 'iNaturalist',
    observation_id: 265781821,
  },
  {
    type: 'iNaturalist',
    observation_id: 265781869,
  },
],
[
  {
    type: 'title',
    content: 'San Mateo "Big Day"',
  },
  {
    type: 'iNaturalist',
    observation_id: 265787605,
  },
  {
    type: 'iNaturalist',
    observation_id: 265787697,
  },
  {
    type: 'iNaturalist',
    observation_id: 265788019,
  },
  {
    type: 'iNaturalist',
    observation_id: 265788110,
  },
  {
    type: 'body',
    content: '',
  },
],
[
  {
    type: 'title',
    content: 'Neighborhood GHOW Screech',
  },
  {
    type: 'eBirdAudio',
    media_url: 'https://macaulaylibrary.org/asset/631929683/embed',
  },
],
[
  {
    type: 'title',
    content: 'The Watsonville Thick-billed Kingbird',
  },
  {
    type: 'iNaturalist',
    observation_id: 264731238,
  },
  {
    type: 'body',
    content: 'Last night I did a double-take while looking at recent iNaturalist observations for the Central Coast. A kingbird with a large bill.. Something that I\'d never seen in person before but spent hours studying and searching for in Arizona - specifically last May (2024) when we visited the Paton Center - a Thick-billed kingbird! I checked eBird and there it was - found by Max Ferrero on March 8, 2025 on Peckham Road. Funnily enough, I had just driven on this road the previous week on the way to Mount Madonna. We probably cruised right past it!',
  },
],
[
  {
    type: 'title',
    content: 'Snipes in Flight',
  },
  {
    type: 'body',
    content: 'Compare the amount of barring on the underwing.',
  },
  {
    type: 'image',
    src: 'https://inaturalist-open-data.s3.amazonaws.com/photos/474023920/original.jpg',
    alt: 'Wilson\'s Snipe',
  },
  {
    type: 'body',
    content: 'Wilson\'s snipe has significant amounts of barring which at a distance can appear quite dark.',
  },
    {
    type: 'image',
    src: 'https://inaturalist-open-data.s3.amazonaws.com/photos/459007655/original.jpg',
    alt: 'Common Snipe',
  },
  {
    type: 'body',
    content: 'Common snipe has a conspicuous white patch as well as a trailing white edge on the secondaries.',
  },
],

[
  {
    type: 'title',
    content: 'Lingering juvenile plumage in Nuttall\'s White-crowned sparrow',
  },
  {
    type: 'body',
    content: 'I saw this bird across from Crespi Pond. At first it appeared to be an adult, but upon taking this photo I noticed some brown crown feathers.',
  },
  {
    type: 'image',
    src: 'https://inaturalist-open-data.s3.amazonaws.com/photos/472614271/original.jpg',
    alt: 'Nuttall\'s White-crowned sparrow',
  },
],
[
  {
    type: 'title',
    content: 'Reading Snowy Plover Bands',
  },
  {
    type: 'body',
    content: 'Read the colors from left to right, top-down - always from the bird\'s perspective.'
  },
  {
    type: 'heading',
    content: 'Example',
  },
  {
    type: 'image',
    src: "/kyanocitta/images/snpl.png",
    alt: 'Another image',
  },
  {
    type: 'body',
    content: 'This bird has black, orange, pink, red, which can be read as ko:pr.'
  },
]
];

function Blog() {
  return (
      <div className="blog-post-container">
        {posts.map((post, index) => (
          <BlogPost key={index} post={post} />
        ))}
      </div>
  );
}

export default Blog;

