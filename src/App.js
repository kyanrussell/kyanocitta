import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "components/Header";
import Blog from "pages/Blog";
import About from "pages/About";
import Birds from "pages/Birds";
import Identification from "pages/Identification";
import Landscapes from "pages/Landscapes";
import Photography from "pages/Photography";
import Midway from "pages/Midway";
import Plants from "pages/Plants";
import Japan from "pages/Japan";
import SierraNevada from "pages/SierraNevada";
import Hawaii from "pages/Hawaii";
import Guide from 'pages/seawatch/Guide';
import CompareSpecies from 'pages/seawatch/ComparePage';
import Calendar from 'pages/seawatch/Calendar';
import Highlights from 'pages/seawatch/HallOfFame';

function App() {
  return (
    <div>
    < Header />
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/birds" element={<Birds />} />
        <Route path="/identification" element={<Identification />} />
        <Route path="/landscapes" element={<Landscapes />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/midway" element={<Midway />} />
        <Route path="/plants" element={<Plants />} />
        <Route path="/japan" element={<Japan />} />
        <Route path="/hawaii" element={<Hawaii />} />
        <Route path="/sierra-nevada" element={<SierraNevada />} />
        <Route path="/seawatch/guide" element={<Guide />} />
        <Route path="/seawatch/compare" element={<CompareSpecies />} />
        <Route path="/seawatch/calendar" element={<Calendar />} />
        <Route path="/seawatch/highlights" element={<Highlights />} />
      </Routes>
    </div>
  );
}

export default App;

