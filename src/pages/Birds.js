import React, { useState, useEffect } from 'react';
import styled from "styled-components";

import { imageData, Categories } from 'data/images';
import Gallery from 'components/Gallery';

function Birds() {
  return Gallery(Categories.BIRD)
}

export default Birds;