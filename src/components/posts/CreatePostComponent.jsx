import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { createPost, uploadFile } from "../../lib";
import { Components } from "../";
import { useNavigate } from "react-router-dom";

function CreatePostComponent() {
  const { register, handleSubmit, control, reset } = useForm();
  const userData = useSelector((state) => state.auth.userData);
  const naviagte = useNavigate();

  async function postSubmit(data) {
    try {
      const fileId = await uploadFile(data.image[0]);
      if (!fileId) throw new Error("Image upload failed");
      await createPost({
        title: data.title,
        content: data.content,
        featuredImage: fileId,
        status: data.status,
        userId: userData.$id,
      });
      reset();
      naviagte("/all-posts");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(postSubmit)}
      className="max-w-4xl mx-auto space-y-6 p-4"
    >
      <Components.InputField
        label="Title"
        placeholder="Post title"
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
      <Components.Button type="submit" variant="primary" className="w-full">
        Create Post
      </Components.Button>
    </form>
  );
}

export default CreatePostComponent;
