// src/App.js
import React from "react";
import BlogPost from "./BlogPost";

const posts = [
  {
    title: "My First Post",
    content: "This is the content of the first post.",
    imageUrl: "https://github.com/kyanrussell/kyanocitta/releases/download/0.1/DSC09961.JPG",
  },
  {
    title: "Another Post",
    content: "Here's some more content.",
    imageUrl: "https://github.com/your-username/your-repo/releases/download/v1.0/image2.jpg",
  },
];

function App() {
  return (
    <div className="App">
      <header>
        <h1>Welcome to My Blog</h1>
      </header>
      <main>
        {posts.map((post, index) => (
          <BlogPost key={index} {...post} />
        ))}
      </main>
      <footer>
        <p>&copy; 2025 My Blog</p>
      </footer>
    </div>
  );
}

export default App;

