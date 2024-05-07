import { RouterProvider } from "react-router-dom";
import { router } from "@app/router/router";

const AppComponent = () => {
  return <RouterProvider router={router}  />;
};

export default AppComponent