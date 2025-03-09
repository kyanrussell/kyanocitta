import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Blog from "./Blog";
import About from "./About";
import Birds from "./Birds";
import Identification from "./Identification";
import Landscapes from "./Landscapes";
import Midway from "./Midway";
import Plants from "./Plants";
import Seawatch from "./Seawatch";

function App() {
  return (
    <div>
    < Header />
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/birds" element={<Birds />} />
        <Route path="/identification" element={<Identification />} />
        <Route path="/landscapes" element={<Landscapes />} />
        <Route path="/midway" element={<Midway />} />
        <Route path="/plants" element={<Plants />} />
        <Route path="/seawatch" element={<Seawatch />} />
      </Routes>
    </div>
  );
}

export default App;

