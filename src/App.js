import React from "react";
import { Routes, Route } from "react-router-dom";
import BlogPost from "./BlogPost";
import Header from "./Header";
import Blog from "./Blog";
import Midway from "./Midway";
import posts from "./posts";

function App() {
  return (
    <div>
    < Header />
      <Routes basename={process.env.PUBLIC_URL}>
        <Route path="/" element={<Blog />} />
        <Route path="/midway" element={<Midway />} />
      </Routes>
    </div>
  );
}

export default App;

