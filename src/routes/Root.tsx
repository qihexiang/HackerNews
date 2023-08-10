import { Link, Outlet } from "react-router-dom";

function RouteRoot() {
  return (
    <div>
      <div>
        <Link to={"/todo"}>Todo</Link>
        <Link to={"/hakernews"}>Haker News</Link>
      </div>
      <Outlet></Outlet>
    </div>
  );
}

export default RouteRoot;
