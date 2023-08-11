import { useEffect, useState } from "react";
import { InView } from "react-intersection-observer";
import useSWR from "swr";
import LoadError from "../components/Error";
import Loading from "../components/Loading";
import fetcher from "../utils/fetcher";
import classes from "./HackerNews.module.css";
import { Link, useParams } from "react-router-dom";
import { formatDistance } from "date-fns";
import { Item } from "../DataType";

function HackerNews() {
  const params = useParams();
  const channel = params["channel"] ?? "top";

  const [LoadMore, setLoadMore] = useState(false);
  const [endIndex, setIndex] = useState(9);

  useEffect(() => {
    const interval = setInterval(() => {
      if (LoadMore) setIndex((index) => index + 9);
    }, 1000);
    return () => clearInterval(interval);
  }, [LoadMore]);

  const { data: list, error } = useSWR<number[]>(
    `https://hacker-news.firebaseio.com/v0/${channel}stories.json`,
    fetcher,
    { refreshInterval: 60 * 1000 }
  );

  if (error) return <LoadError></LoadError>;

  if (list === undefined) return <Loading></Loading>;

  return (
    <>
      <div className={classes.newsList}>
        {list.slice(0, endIndex).map((item) => (
          <HackerNewsItem newsId={item} key={item}></HackerNewsItem>
        ))}
      </div>
      <InView
        className={classes.loadMore}
        onChange={(inview) => setLoadMore(inview)}
      >
        <Loading></Loading>
        Loading more...
      </InView>
    </>
  );
}

function HackerNewsItem(props: { newsId: number }) {
  const { newsId } = props;
  const { data: news, error } = useSWR<Item>(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json`, fetcher, {
    refreshInterval: 60 * 1000,
  });

  const readMoreLink = (content: JSX.Element | string) => (
    <Link to={`/HackerNews/readmore/${newsId}`}>{content}</Link>
  );

  if (error) return <LoadError></LoadError>;

  if (news === undefined) return <Loading></Loading>;

  if (news.deleted) return null;

  return (
    <div className={classes.newsItem}>
      <h4>{news.title} {news.url !== undefined ? <a href={news.url}>Link</a> : null}</h4>
      <div>
        <div className={classes.meta}>
          <p>
            {formatDistance(new Date(news.time * 1000), new Date(), {
              includeSeconds: true,
            })} ago
          </p>
          {<Link to={`/HackerNews/user/${news.by}`}>{news.by}</Link>}
        </div>
        <div className={classes.more}>
          <p>Score: {news.score}</p>
          {readMoreLink(
            news.kids !== undefined ? `${news.kids.length} comments` : "discuss"
          )}
          {readMoreLink("more")}
        </div>
      </div>
    </div>
  );
}

export default HackerNews;
