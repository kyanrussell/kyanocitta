import React from "react";
import BlogPost from "./BlogPost";
import Header from "./Header";
import posts from "./posts";

function App() {
  return (
    <div>
    < Header />
    <div className="blog-post-container">
      {posts.map((post, index) => (
        <BlogPost key={index} post={post} />
      ))}
    </div>
    </div>
  );
}

export default App;

