import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPost, deletePost, getFilePreview } from "../lib";
import { useSelector, useDispatch } from "react-redux";
import { Components } from "../components";
import parse from "html-react-parser";
import {
  hideLoading,
  showLoading,
} from "../features/loadingSlice/loadingSlice";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const { isLoading } = useSelector((store) => store.loading);

  const [postDetails, setPostDetails] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        dispatch(showLoading("Post Details"));
        const post = await getPost(id);
        setPostDetails(post);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        dispatch(hideLoading());
      }
    }

    fetchPost();
  }, [id, dispatch]);

  async function handleDelete() {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      await deletePost(id);
      navigate("/all-posts");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  if (!postDetails) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-300 mt-10 ">
        Post not found.
      </div>
    );
  }

  const isOwner = userData?.$id === postDetails.userId;

  return (
    <div
      className="max-w-4xl mx-auto my-10 p-6 rounded-2xl 
                 bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-800"
    >
      {isLoading && <Components.LoadingSpinner fullScreen />}
      {/* Post Image */}
      {postDetails.featuredImage && (
        <div className="overflow-hidden rounded-xl mb-6">
          <img
            src={getFilePreview(postDetails.featuredImage)}
            alt={postDetails.title}
            className="w-full h-[400px] object-cover rounded-xl"
          />
        </div>
      )}

      {/* Post Title */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        {postDetails.title}
      </h1>

      {/* Post Content (Parsed HTML) */}
      <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
        {parse(postDetails.content || "<p>No content</p>")}
      </div>

      <p className="text-sm font-bold pt-2 text-gray-500 dark:text-gray-400 mb-4">
        Created At • {new Date(postDetails.$createdAt).toLocaleDateString()}
      </p>

      {/* Buttons only for post owner */}
      {isOwner && (
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link to={`/edit-post/${id}`}>
            <Components.Button variant="primary" size="md">
              Edit
            </Components.Button>
          </Link>
          <Components.Button onClick={handleDelete} variant="danger" size="md">
            Delete
          </Components.Button>
        </div>
      )}
    </div>
  );
}

export default PostDetails;
