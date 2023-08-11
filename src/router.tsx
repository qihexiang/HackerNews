import { createBrowserRouter } from "react-router-dom";
import HackerNews from "./routes/hackernews";
import Root from "./routes/Root";
import ReadMore from "./routes/ReadMore";

const router = createBrowserRouter([
  {
    path: "/hackernews",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <HackerNews></hackernews>,
      },
      {
        path: "user/:username",
        element: <div>User information</div>,
      },
      {
        path: "readmore/:newsId",
        element: <ReadMore></ReadMore>
      },
      {
        path: ":channel",
        element: <HackerNews></hackernews>,
      },
    ],
  },
]);

export default router;
