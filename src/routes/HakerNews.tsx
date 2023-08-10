import { useEffect, useState } from "react";
import { InView } from "react-intersection-observer";
import useSWR from "swr";
import fetcher from "../utils/fetcher";

function HakerNews() {
  const [LoadMore, setLoadMore] = useState(false);
  const [endIndex, setIndex] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      if (LoadMore) setIndex((index) => index + 10);
    }, 1000);
    return () => clearInterval(interval);
  }, [LoadMore]);

  const { data: list, error } = useSWR<number[]>(
    "https://hacker-news.firebaseio.com/v0/topstories.json",
    fetcher
  );

  if (error) return <div>Failed to load data</div>;

  if (list === undefined) return <div>Loading ...</div>;

  return (
    <div>
      <ul>
        {list.slice(0, endIndex).map((item) => (
          <HakerNewsItem newsId={item} key={item}></HakerNewsItem>
        ))}
      </ul>
      <InView
        onChange={(inview) => setLoadMore(inview)}
      >
        加载更多
      </InView>
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

  if (error || news?.deleted === true) return null;

  if (news === undefined) {
    return <div>Loading ...</div>;
  }
  return (
    <div>
      <h4>{news.title}</h4>
      <a href={news.url}>Link</a>
      <p>{new Date(news.time * 1000).toLocaleDateString()}</p>
    </div>
  );
}

export default HakerNews;
