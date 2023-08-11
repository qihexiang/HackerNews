import { Link, Outlet } from "react-router-dom";
import classes from "./Root.module.css";

function Root() {
  return (
    <div>
      <div className={classes.navbar}>
        <h1>Haker News</h1>
        <div className={classes.menu}>
          <Link to={"/hackernews"}>Top</Link>
          <Link to={"/hackernews/new"}>New</Link>
          <Link to={"/hackernews/best"}>Best</Link>
        </div>
      </div>
      <div className={classes.container}>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default Root;
