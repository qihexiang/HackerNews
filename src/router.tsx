import { createBrowserRouter } from "react-router-dom";
import Index from "./routes/Index";
import HakerNews from "./routes/HakerNews";
import TodoList from "./routes/TodoList";
import RouteRoot from "./routes/Root";
import { InView } from "react-intersection-observer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouteRoot></RouteRoot>,
    children: [
      {
        index: true,
        element: <Index></Index>,
      },
      {
        path: "/todo",
        element: <TodoList></TodoList>,
      },
      {
        path: "/hakernews",
        element: <HakerNews></HakerNews>,
      },
      {
        path: "/inview_test",
        element: (
          <div>
            <div style={{ height: 640 }}></div>
            <InView onChange={(inview) => console.log(inview)}>
              <h1>大标题</h1>
            </InView>
          </div>
        ),
      },
    ],
  },
]);

export default router;
