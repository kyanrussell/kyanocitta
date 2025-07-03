import React, { useState, useEffect } from 'react';
import styled from "styled-components";

import { imageData, Categories } from 'data/images';
import Gallery from 'components/Gallery';

function Identification() {
  return Gallery(Categories.IDENTIFICATION)
}

// function Identification() {
//   return (
//     <BlogPost post={[
// 	  {
// 	    type: 'title',
// 	    content: 'Snipes in Flight',
// 	  },
// 	  {
// 	    type: 'body',
// 	    content: 'Midway Atoll offered the unique opportunity to directly compare Wilson\'s and Common snipes in the field. Compare the amount of barring on the underwing in these flight shots.',
// 	  },
// 	  {
// 	    type: 'image',
// 	    src: 'https://inaturalist-open-data.s3.amazonaws.com/photos/474023920/original.jpg',
// 	    alt: 'Wilson\'s Snipe',
// 	  },
// 	  {
// 	    type: 'body',
// 	    content: 'Wilson\'s snipe has significant amounts of barring which at a distance can appear quite dark.',
// 	  },
// 	    {
// 	    type: 'image',
// 	    src: 'https://inaturalist-open-data.s3.amazonaws.com/photos/459007655/original.jpg',
// 	    alt: 'Common Snipe',
// 	  },
// 	  {
// 	    type: 'body',
// 	    content: 'Common snipe has a conspicuous white patch as well as a trailing white edge on the secondaries.',
// 	  },
// 	]}
//     />
//   );
// }

export default Identification;

