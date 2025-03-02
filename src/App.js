import React from "react";
import BlogPost from "./BlogPost";

const posts = [
  {
    title: "Snowy Plovers",
    content: `
    # How much markdown can I use?
    Probably not much.
    `,
    imageUrl: "/kyanocitta/images/snpl.png",
  },
];

function App() {
  return (
    <div className="w-screen h-screen">
      {posts.map((post, index) => (
        <BlogPost key={index} {...post} />
      ))}
    </div>
  );
}

export default App;

