import React from "react";
import { Routes, Route } from "react-router-dom";
import BlogPost from "./BlogPost";
import Header from "./Header";
import Blog from "./Blog";
import About from "./About";
import Identification from "./Identification";
import Midway from "./Midway";
import Seawatch from "./Seawatch";
import posts from "./posts";

function App() {
  return (
    <div>
    < Header />
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/identification" element={<Identification />} />
        <Route path="/midway" element={<Midway />} />
        <Route path="/seawatch" element={<Seawatch />} />
      </Routes>
    </div>
  );
}

export default App;

