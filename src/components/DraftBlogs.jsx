import { useEffect, useState } from "react";
import { getAllPosts, updatePost, getFilePreview } from "../lib";
import { useSelector } from "react-redux";
import { Components } from "../components";
import { Link } from "react-router-dom";

function DraftBlogs() {
  const [draftPosts, setDraftPosts] = useState([]);
  const user = useSelector((state) => state.auth.userData);

  useEffect(() => {
    getAllPosts().then((posts) => {
      if (posts) {
        const drafts = posts.documents.filter(
          (post) => post.status === "draft" && post.userId === user?.$id
        );
        setDraftPosts(drafts);
      }
    });
  }, [user]);

  async function handleToggleStatus(postId) {
    try {
      await updatePost(postId, { status: "active" });
      setDraftPosts((prev) => prev.filter((post) => post.$id !== postId));
      alert("Post published successfully!");
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to publish post.");
    }
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] text-gray-600 dark:text-gray-300">
        Please log in to view your drafts.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-10">
          Your Draft Posts
        </h1>

        {draftPosts.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            You have no drafts right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {draftPosts.map((post) => (
              <div
                key={post.$id}
                className="group bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                {/* Each post is clickable */}
                <Link to={`/post-details/${post.$id}`}>
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={getFilePreview(post.featuredImage)}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>

                <div className="p-5">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Status:{" "}
                    <span className="font-medium text-yellow-600">Draft</span>
                  </p>
                  <Components.Button
                    onClick={() => handleToggleStatus(post.$id)}
                    className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors duration-300"
                  >
                    Publish Now
                  </Components.Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DraftBlogs;
