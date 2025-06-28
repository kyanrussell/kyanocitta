import React, { useState, useEffect } from 'react';
import styled from "styled-components";

import { imageData, Categories } from 'data/images';
import Gallery from 'components/Gallery';

function Landscapes() {
  return Gallery(Categories.LANDSCAPE)
}

export default Landscapes;