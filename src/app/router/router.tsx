import MainPage from "@/screens/MainPage/MainPage";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
]);

export { router };
