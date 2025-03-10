import BlogPost from "./BlogPost";
import iNaturalistWidget from "./iNaturalist";

const posts = [
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

