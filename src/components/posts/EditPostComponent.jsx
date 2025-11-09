import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  getPost,
  updatePost,
  uploadFile,
  deleteFile,
  getFilePreview,
} from "../../lib";
import { Components } from "../";
import { useDispatch, useSelector } from "react-redux";
import {
  hideLoading,
  showLoading,
} from "../../features/loadingSlice/loadingSlice";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const { register, handleSubmit, control, reset } = useForm();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.loading);

  // Fetch post details
  useEffect(() => {
    async function fetchPost() {
      try {
        dispatch(showLoading("Updating Post..."));
        const data = await getPost(id);
        setPost(data);
        reset({
          title: data.title,
          content: data.content,
          status: data.status,
        });
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        dispatch(hideLoading());
      }
    }
    fetchPost();
  }, [id, reset, dispatch]);

  // Update handler
  async function onSubmit(data) {
    try {
      let featuredImage = post.featuredImage;

      // If a new image is uploaded, replace the old one
      if (data.image?.[0]) {
        const newFileId = await uploadFile(data.image[0]);
        if (newFileId) {
          await deleteFile(featuredImage);
          featuredImage = newFileId;
        }
      }

      await updatePost(id, {
        title: data.title,
        content: data.content,
        featuredImage,
        status: data.status,
      });

      navigate(`/post-details/${id}`);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  }

  if (isLoading) {
    return <Components.LoadingSpinner message="Updating your post..." />;
  }

  if (!post) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-300 mt-10">
        Post not found.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto space-y-6 p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800"
    >
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-6">
        Edit Post
      </h1>

      <Components.InputField
        label="Title"
        placeholder="Enter post title"
        {...register("title", { required: true })}
      />

      <Components.RTE name="content" label="Content" control={control} />

      {/* Current image preview */}
      {post.featuredImage && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Current Featured Image:
          </p>
          <img
            src={getFilePreview(post.featuredImage)}
            alt="Current featured"
            className="w-full h-64 object-cover rounded-xl border border-gray-300 dark:border-gray-700"
          />
        </div>
      )}

      <Components.InputField
        label="Replace Image"
        type="file"
        accept="image/*"
        {...register("image")}
      />

      <Components.Selector
        label="Status"
        options={["active", "draft"]}
        {...register("status")}
      />

      <Components.Button type="submit" variant="primary" className="w-full">
        Update Post
      </Components.Button>
    </form>
  );
}

export default EditPost;
