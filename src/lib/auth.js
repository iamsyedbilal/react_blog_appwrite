import { appwriteAccount } from "./appwrite";
import { ID } from "appwrite";

// Create Account
export async function createAccount({ name, email, password }) {
  try {
    await appwriteAccount.create(ID.unique(), email, password, name);
    await appwriteAccount.createEmailPasswordSession(email, password);
    return await appwriteAccount.get();
  } catch (error) {
    if (error?.message?.includes("exists")) {
      throw new Error("An account with this email already exists.");
    }
    throw new Error("Failed to create account. Please try again.");
  }
}

// Login User
export async function userLogin({ email, password }) {
  try {
    const session = await appwriteAccount.createEmailPasswordSession(
      email,
      password
    );
    return session;
  } catch (error) {
    if (error?.message?.toLowerCase().includes("invalid credentials")) {
      throw new Error("Invalid email or password.");
    }
    throw new Error("Login failed. Please try again.");
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const user = await appwriteAccount.get();
    return user;
  } catch (err) {
    if (err.code === 401) {
      console.log("Guest user — not logged in");
      return null;
    }
    throw err;
  }
}

//Get user
export async function getUser(userId) {
  try {
    const user = await appwriteAccount.get(userId);
    console.log(user);
  } catch (error) {
    if (error?.message?.includes("Missing scope")) return null;
    throw error;
  }
}

// Logout User
export async function logoutUser() {
  try {
    await appwriteAccount.deleteSession("current");
  } catch (error) {
    if (error?.message?.includes("Missing scope")) {
      console.log("No active session, skipping logout.");
      return;
    }
    console.error("Error logging out:", error);
  }
}
