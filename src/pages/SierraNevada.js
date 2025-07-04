import React, { useState, useEffect } from 'react';
import styled from "styled-components";

import { imageData, Categories, Location } from 'data/images';
import { LocationGallery } from 'components/Gallery';

function SierraNevada() {
  return LocationGallery(Location.SIERRA_NEVADA)
}

export default SierraNevada;