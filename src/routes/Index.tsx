import { Link } from "react-router-dom";

function Index() {
  return (
    <div>
      <h1>Welcome</h1>
      <Link to={"/todo"}>Todo</Link>
      <Link to={"/hakernews"}>Haker News</Link>
    </div>
  );
}

export default Index;
