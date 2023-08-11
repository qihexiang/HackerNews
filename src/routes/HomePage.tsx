import useSWR from "swr";
import fetcher from "../utils/fetcher";

type PostData = {
    title: string,
    content: string,
    postedBy: {
        id: number,
        email: string,
        nickname: string | null
    },
    createdAt: string
}

function HomePage() {
  const { data: posts, error } = useSWR<
    PostData[]
  >("/api/post", fetcher);

  if (error) return <div>Failed to load data</div>;

  if (posts === undefined) return <div>Loading</div>;

  return (
    <div>
      {posts.map((post, index) => (
        <PostItem {...post} key={index}></PostItem>
      ))}
    </div>
  );
}

function PostItem(props: PostData) {
  return (
    <div>
      <h4>{props.title}</h4>
      <p>{props.postedBy.nickname} {props.postedBy.email}</p>
      <p>{props.content}</p>
      <p>{new Date(props.createdAt).toLocaleDateString()}</p>
    </div>
  );
}

export default HomePage;
