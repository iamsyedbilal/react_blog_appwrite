import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Components } from "../components";
import { getAllPosts } from "../lib";
import { FaAngleRight } from "react-icons/fa";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then((res) => {
      if (res) {
        const activePosts = res.documents
          .filter((post) => post.status === "active")
          .slice(0, 4);
        setPosts(activePosts);
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-800 text-white py-24 px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            Share Your Voice with the World
          </h1>
          <p className="text-lg sm:text-xl text-indigo-100 max-w-2xl mx-auto mb-10 drop-shadow-sm">
            Discover inspiring stories, creative ideas, and fresh perspectives
            from writers around the globe.
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            <Link to="/create-post">
              <Components.Button
                variant="primary"
                size="lg"
                className="flex items-center gap-2"
              >
                Start Writing <FaAngleRight className="animate-bounce" />
              </Components.Button>
            </Link>
            <Link to="/all-posts">
              <Components.Button
                variant="secondary"
                size="lg"
                className="flex items-center gap-2"
              >
                Explore Posts <FaAngleRight />
              </Components.Button>
            </Link>
          </div>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-400 opacity-30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        </div>
      </section>

      {/* ===== LATEST POSTS ===== */}
      <Components.FeaturedPosts posts={posts} />

      {/* ===== CTA / JOIN SECTION ===== */}
      <Components.CTA />
    </div>
  );
}

export default Home;
