import { Link, Outlet } from "react-router-dom";
import classes from "./Root.module.css";

function Root() {
  return (
    <div>
      <div className={classes.navbar}>
        <h1>Haker News</h1>
        <div className={classes.menu}>
          <Link to={"/hakernews"}>Top</Link>
          <Link to={"/hakernews/new"}>New</Link>
          <Link to={"/hakernews/best"}>Best</Link>
        </div>
      </div>
      <Outlet></Outlet>
    </div>
  );
}

export default Root;
