import MainPage from "@/screens/MainPage/MainPage";
import { ConstantUtils } from "@/services/ConstantUtils";
import { getComments } from "@/services/api/CommentsApi";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    loader: async () => {
      const comments = await getComments(0, ConstantUtils.LOAD_SIZE);

      return comments;
    },
  },
]);

export { router };
