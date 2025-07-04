import React, { useState, useEffect } from 'react';
import styled from "styled-components";

import { imageData, Categories, Location } from 'data/images';
import { LocationGallery } from 'components/Gallery';

function Hawaii() {
  return LocationGallery(Location.HAWAII)
}

export default Hawaii;