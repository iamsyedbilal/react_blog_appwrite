import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Pages } from "./pages";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { Components } from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Pages.Home />,
      },
      {
        path: "/login",
        element: (
          <Components.ProtectedRoutes authentication={false}>
            <Pages.Login />
          </Components.ProtectedRoutes>
        ),
      },
      {
        path: "/signup",
        element: (
          <Components.ProtectedRoutes authentication={false}>
            <Pages.Signup />
          </Components.ProtectedRoutes>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <Components.ProtectedRoutes authentication>
            <Pages.AllPosts />
          </Components.ProtectedRoutes>
        ),
      },
      {
        path: "/create-post",
        element: (
          <Components.ProtectedRoutes authentication>
            <Pages.CreatePost />
          </Components.ProtectedRoutes>
        ),
      },
      {
        path: "/edit-post/:id",
        element: (
          <Components.ProtectedRoutes authentication>
            <Pages.EditPost />
          </Components.ProtectedRoutes>
        ),
      },
      {
        path: "/post-details/:id",
        element: (
          <Components.ProtectedRoutes authentication>
            <Pages.PostDetails />
          </Components.ProtectedRoutes>
        ),
      },
      {
        path: "/user-profile",
        element: (
          <Components.ProtectedRoutes authentication>
            <Pages.Profile />
          </Components.ProtectedRoutes>
        ),
      },
      {
        path: "/draft-blogs",
        element: (
          <Components.ProtectedRoutes authentication>
            <Components.DraftBlogs />
          </Components.ProtectedRoutes>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
