import { createBrowserRouter } from "react-router-dom";
import HackerNews from "./routes/HackerNews";
import Root from "./routes/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <HackerNews></HackerNews>,
      },
      {
        path: ":channel",
        element: <HackerNews></HackerNews>,
      },
    ],
  },
], {
  basename: "/hackernews"
});

export default router;
