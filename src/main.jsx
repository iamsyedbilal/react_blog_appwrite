import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Pages } from "./pages";
import { store } from "./store/store.js";
import { Provider } from "react-redux";

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
        element: <Pages.Login />,
      },
      {
        path: "/signup",
        element: <Pages.Signup />,
      },
      {
        path: "/create-post",
        element: <Pages.CreatePost />,
      },
      {
        path: "/edit-post:id",
        element: <Pages.EditPost />,
      },
      {
        path: "/post-details:id",
        element: <Pages.PostDetails />,
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
