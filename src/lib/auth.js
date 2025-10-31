import { appwriteAccount } from "./appwrite";
import { ID } from "appwrite";

export async function createAccount({ name, email, password }) {
  try {
    try {
      const current = await appwriteAccount.get();
      if (current) await appwriteAccount.deleteSession("current");
    } catch (error) {
      console.log(error);
    }
    await appwriteAccount.create(ID.unique(), email, password, name);
    await appwriteAccount.createEmailPasswordSession(email, password);
    const currentUser = await appwriteAccount.get();
    return currentUser;
  } catch (error) {
    if (error?.message?.includes("exists")) {
      throw new Error("An account with this email already exists.");
    }
    throw new Error("Failed to create account. Please try again.");
  }
}

export async function userLogin({ email, password }) {
  try {
    const current = await getCurrentUser();
    if (current) return current;
  } catch (error) {
    if (error?.code !== 401) console.error("Session check failed:", error);
  }
  // create new session & return user
  await appwriteAccount.createEmailPasswordSession(email, password);
  return await getCurrentUser();
}

export async function getCurrentUser() {
  return await appwriteAccount.get();
}

export async function logoutUser() {
  try {
    const currentUser = await appwriteAccount.get();
    if (currentUser) await appwriteAccount.deleteSessions("current");
  } catch (error) {
    console.error("Error logging out:", error);
  }
}
