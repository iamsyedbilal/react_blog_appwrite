import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { createPost, uploadFile } from "../../lib";
import { Components } from "../";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  showLoading,
  hideLoading,
} from "../../features/loadingSlice/loadingSlice";

function CreatePostComponent() {
  const { register, handleSubmit, control, reset } = useForm();
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.loading);

  async function postSubmit(data) {
    try {
      setError("");
      dispatch(showLoading("Creating Post..."));
      const fileId = await uploadFile(data.image[0]);
      if (!fileId) throw new Error("Image upload failed");

      await createPost({
        title: data.title,
        content: data.content,
        featuredImage: fileId,
        status: data.status || "draft",
        userId: userData.$id,
      });
      navigate("/all-posts");
    } catch (error) {
      console.error(error);
      setError("Something went wrong while creating the post. Try again!");
    } finally {
      dispatch(hideLoading());
      reset();
    }
  }

  return (
    <form
      onSubmit={handleSubmit(postSubmit)}
      className="max-w-4xl mx-auto space-y-6 p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800"
    >
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-6">
        Create New Post
      </h1>

      <Components.InputField
        label="Title"
        placeholder="Enter your post title"
        {...register("title", { required: true })}
      />

      <Components.RTE name="content" label="Content" control={control} />

      <Components.InputField
        label="Featured Image"
        type="file"
        accept="image/*"
        {...register("image", { required: true })}
      />

      <Components.Selector
        label="Status"
        options={["active", "draft"]}
        {...register("status")}
      />

      {error && (
        <p className="text-red-600 dark:text-red-400 text-sm text-center">
          {error}
        </p>
      )}

      {isLoading ? (
        <Components.LoadingSpinner message="Publishing your post..." />
      ) : (
        <div className="flex justify-center">
          <Components.Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
          >
            Create Post
          </Components.Button>
        </div>
      )}
    </form>
  );
}

export default CreatePostComponent;
