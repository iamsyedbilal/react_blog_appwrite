import { Components } from "../components";
import { getAllPosts } from "../lib";
import { useEffect, useState } from "react";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPost, setFilteredPost] = useState([]);

  useEffect(() => {
    getAllPosts().then((posts) => {
      if (posts) {
        const activePosts = posts.documents.filter(
          (post) => post.status === "active"
        );
        setPosts(activePosts);
        setFilteredPost(activePosts);
      }
    });
  }, []);

  useEffect(() => {
    const result = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPost(result);
  }, [posts, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-10">
          All Posts
        </h1>

        <div className="py-4 w-full md:w-1/2">
          <div className="relative w-full">
            <Components.InputField
              placeholder="Search For Blogs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && setSearchTerm(e.target.value)
              }
              className="w-full pr-24"
            />
            <Components.Button
              variant="primary"
              size="md"
              className="absolute right-0 top-1/2 transform -translate-y-1/2"
              onClick={() => setSearchTerm(searchTerm)}
            >
              Search
            </Components.Button>
          </div>
        </div>

        {filteredPost.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No posts available yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPost.map((post) => (
              <Components.PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllPosts;
