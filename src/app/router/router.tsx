import MainPage from "@/screens/MainPage/MainPage";
import { getComments } from "@/services/api/CommentsApi";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    loader: async () => {
      const comments = await getComments();

      return comments;
    },
  },
]);

export { router };
