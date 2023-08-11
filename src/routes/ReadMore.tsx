import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import LoadError from "../components/Error";
import Loading from "../components/Loading";
import fetcher from "../utils/fetcher";
import { Item } from "../DataType";

function ReadMore() {
  const params = useParams();

  const { data: news, error } = useSWR<Item>(
    `https://hacker-news.firebaseio.com/v0/item/${params.newsId}.json`,
    fetcher
  );

  if (error) return <LoadError></LoadError>;

  if (news === undefined) return <Loading></Loading>;

  if (news.deleted) return null;

  return (
    <div>
      <h4>{news.title}</h4>
      <Link to={`/HackerNews/user/${news.by}`}>{news.by}</Link>
      <p>{new Date(news.time * 1000).toLocaleDateString()}</p>
      {news.url !== undefined ? <a href={news.url}>Link</a> : null}
      {news.text !== undefined ? (
        <div dangerouslySetInnerHTML={{ __html: news.text }}></div>
      ) : null}
    </div>
  );
}

export default ReadMore;
