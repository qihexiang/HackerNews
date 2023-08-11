import { createBrowserRouter } from "react-router-dom";
import HakerNews from "./routes/HakerNews";
import Root from "./routes/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <HakerNews></HakerNews>
      },
      {
        path: "/:channel",
        element: <HakerNews></HakerNews>,
      },
    ]
  }
]);

export default router;
