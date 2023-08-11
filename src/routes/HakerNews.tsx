import { useEffect, useState } from "react";
import { InView } from "react-intersection-observer";
import useSWR from "swr";
import LoadError from "../components/Error";
import Loading from "../components/Loading";
import fetcher from "../utils/fetcher";
import classes from "./HakerNews.module.css";
import { useParams } from "react-router-dom";

function HakerNews() {
  const params = useParams();
  const channel = params["channel"] ?? "top"

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
    fetcher
  );

  if (error) return <LoadError></LoadError>;

  if (list === undefined) return <Loading></Loading>;

  return (
    <div className={classes.container}>
      <div className={classes.newsList}>
        {list.slice(0, endIndex).map((item) => (
          <HakerNewsItem newsId={item} key={item}></HakerNewsItem>
        ))}
      </div>
      <InView className={classes.loadMore} onChange={(inview) => setLoadMore(inview)}>Loading more...</InView>
    </div>
  );
}

function HakerNewsItem(props: { newsId: number }) {
  const { newsId } = props;
  const { data: news, error } = useSWR<{
    deleted: boolean;
    title: string;
    url: string;
    time: number;
  }>(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json`, fetcher);

  if (error) return <LoadError></LoadError>;

  if (news === undefined) return <Loading></Loading>;

  if (news.deleted) return null;

  return (
    <div>
      <h4>{news.title}</h4>
      <a href={news.url}>Link</a>
      <p>{new Date(news.time * 1000).toLocaleDateString()}</p>
    </div>
  );
}

export default HakerNews;
