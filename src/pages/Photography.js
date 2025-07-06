import React, { useState, useEffect } from 'react';
import styled from "styled-components";

import { imageData, Categories } from 'data/images';
import Gallery from 'components/Gallery';

function Photography() {
  return Gallery(Categories.PHOTOGRAPHY)
}

export default Photography;