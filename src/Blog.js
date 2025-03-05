import posts from "./posts";
import BlogPost from "./BlogPost";

function Blog() {
  return (
      <div className="blog-post-container">
        {posts.map((post, index) => (
          <BlogPost key={index} post={post} />
        ))}
      </div>
  );
}

export default Blog;

