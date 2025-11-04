import { databases, storage } from "./appwrite";
import { ID, Query, Permission, Role } from "appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = "post";
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;

export async function createPost({
  title,
  content,
  featuredImage,
  status,
  userId,
}) {
  try {
    return await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      { title, content, featuredImage, status, userId }
    );
  } catch (error) {
    console.log("Appwrite serive :: createPost :: error", error);
  }
}

export async function updatePost(postId, data) {
  try {
    return await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      postId,
      data
    );
  } catch (error) {
    console.error("Appwrite Service :: updatePost ::", error);
    throw error;
  }
}

export async function getAllPosts() {
  return await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
    Query.orderDesc("$createdAt"),
  ]);
}

export async function getPost(postId) {
  return await databases.getDocument(DATABASE_ID, COLLECTION_ID, postId);
}

export async function deletePost(postId) {
  return await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, postId);
}

export async function uploadFile(file) {
  try {
    const response = await storage.createFile(BUCKET_ID, ID.unique(), file, [
      Permission.read(Role.any()),
    ]);
    return response.$id;
  } catch (error) {
    console.log("Appwrite serive :: uploadFile :: error", error);
    return false;
  }
}

export async function deleteFile(fileId) {
  try {
    await storage.deleteFile(BUCKET_ID, fileId);
    return true;
  } catch (error) {
    console.log("Appwrite serive :: deleteFile :: error", error);
    return false;
  }
}

export function getFilePreview(fileId) {
  return storage.getFileView(BUCKET_ID, fileId);
}
