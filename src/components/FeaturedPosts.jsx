import { Components } from ".";
import { getFilePreview } from "../lib";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";

function FeaturedPosts({ posts }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
        Latest Posts
      </h2>

      {posts.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No posts available yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {posts.map((post) => (
            <Link
              to={`/post-details/${post.$id}`}
              key={post.$id}
              className="group relative bg-white dark:bg-gray-900 rounded-3xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="aspect-video overflow-hidden rounded-t-3xl">
                <img
                  src={
                    post.featuredImage
                      ? getFilePreview(post.featuredImage)
                      : "/placeholder.jpg"
                  }
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="py-6 px-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                  {post.content.replace(/<[^>]+>/g, "").slice(0, 60)}...
                </p>
                {/* <span className="inline-block mt-4 text-indigo-600 dark:text-indigo-400 font-medium group-hover:underline transition duration-200">
                  Read More &rarr;
                </span> */}
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="text-center mt-12">
        <Link to="/all-posts">
          <Components.Button
            variant="primary"
            size="md"
            className="inline-flex items-center gap-2"
          >
            View All Posts <FaAngleRight />
          </Components.Button>
        </Link>
      </div>
    </section>
  );
}

export default FeaturedPosts;
