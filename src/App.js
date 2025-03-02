import React from "react";
import BlogPost from "./BlogPost";
import posts from "./posts";

function App() {
  return (
    <div className="blog-post-container">
      {posts.map((post, index) => (
        <BlogPost key={index} post={post} />
      ))}
    </div>
  );
}

export default App;

