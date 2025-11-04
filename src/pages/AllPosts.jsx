import { Components } from "../components";
import { getAllPosts } from "../lib";
import { useEffect, useState } from "react";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then((posts) => {
      if (posts) {
        const activePosts = posts.documents.filter(
          (post) => post.status === "active"
        );
        setPosts(activePosts);
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-10">
          All Posts
        </h1>

        {posts.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No posts available yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Components.PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllPosts;
