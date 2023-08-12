import { formatDistance } from "date-fns";
import { useEffect, useState } from "react";
import { InView } from "react-intersection-observer";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import { Item } from "../DataType";
import LoadError from "../components/Error";
import Loading from "../components/Loading";
import fetcher from "../utils/fetcher";
import classes from "./HackerNews.module.css";

function HackerNews() {
  const params = useParams();
  const channel = params["channel"] ?? "top";
  const [dialogId, setDialogId] = useState<number | undefined>(undefined);

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
      <div
        style={{
          display: dialogId === undefined ? "none" : "flex",
        }}
        className={classes.modalBase}
        onClick={() => setDialogId(undefined)}
      >
        <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
          {dialogId !== undefined ? (
            <HackerNewsDetail newsId={dialogId}></HackerNewsDetail>
          ) : null}
        </div>
      </div>
      <div className={classes.newsList}>
        {list.slice(0, endIndex).map((item) => (
          <HackerNewsItem
            newsId={item}
            sendToDialog={setDialogId}
            key={item}
          ></HackerNewsItem>
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

function HackerNewsItem(props: {
  newsId: number;
  sendToDialog: (id: number) => void;
}) {
  const { newsId } = props;
  const { data: news, error } = useSWR<Item>(
    `https://hacker-news.firebaseio.com/v0/item/${newsId}.json`,
    fetcher,
    {
      refreshInterval: 60 * 1000,
    }
  );

  if (error) return <LoadError></LoadError>;

  if (news === undefined) return <Loading></Loading>;

  if (news.deleted) return null;

  const ago = `${formatDistance(new Date(news.time * 1000), new Date(), {
    includeSeconds: true,
  })} ago`;

  return (
    <div className={classes.newsItem}>
      <h4>
        {news.title}{" "}
        {news.url !== undefined ? <a href={news.url}>Link</a> : null}
      </h4>
      <div className={classes.operations}>
        <div className={classes.meta}>
          <p>{ago}</p>
          {<Link to={`/user/${news.by}`}>{news.by}</Link>}
        </div>
        <div
          className={classes.more}
          onClick={() => props.sendToDialog(props.newsId)}
        >
          <p>Score: {news.score}</p>
          <p>
            {news.kids !== undefined
              ? `${news.kids.length} comments`
              : "discuss"}
          </p>
          <button
            className={classes.moreBtn}
            onClick={() => props.sendToDialog(props.newsId)}
          >
            more...
          </button>
        </div>
      </div>
    </div>
  );
}

function HackerNewsDetail(props: { newsId: number }) {
  const { newsId } = props;
  const { data: news, error } = useSWR<Item>(
    `https://hacker-news.firebaseio.com/v0/item/${newsId}.json`,
    fetcher
  );

  if (error) return <LoadError></LoadError>;

  if (news === undefined) return <Loading></Loading>;

  const ago = `${formatDistance(new Date(news.time * 1000), new Date(), {
    includeSeconds: true,
  })} ago`;

  return (
    <>
      <div className={classes.detailMeta}>
        <p className={classes.detailTitle}>{news.title}</p>
        <p>
          {ago} | By: {<Link to={`/user/${news.by}`}>{news.by}</Link>} | Score:{" "}
          {news.score}{" "}
          {news.url !== undefined ? (
            <>
              | <a href={news.url}>Link</a>
            </>
          ) : null}
        </p>
      </div>
      {news.text !== undefined ? (
        <div dangerouslySetInnerHTML={{ __html: news.text }}></div>
      ) : null}
      {news.kids !== undefined ? <Comments list={news.kids}></Comments> : null}
    </>
  );
}

function Comments(props: { list: number[] }) {
  const { list } = props;
  const [endIndex, setIndex] = useState(5);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (loadMore) {
        setIndex((index) => index + 5);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [loadMore]);

  return (
    <div className={classes.commentList}>
      {list.slice(0, endIndex).map((item) => (
        <CommentItem commentId={item} key={item}></CommentItem>
      ))}
      {endIndex < list.length ? (
        <InView
          className={classes.loadMore}
          onChange={(inview) => setLoadMore(inview)}
        >
          <Loading></Loading>
          Loading more...
        </InView>
      ) : null}
    </div>
  );
}

function CommentItem(props: { commentId: number }) {
  const { commentId } = props;
  const { data: comment, error } = useSWR<Item>(
    `https://hacker-news.firebaseio.com/v0/item/${commentId}.json`,
    fetcher
  );

  if (error) return <LoadError></LoadError>;

  if (comment === undefined) return <Loading></Loading>;

  if (comment.deleted) return null;

  const ago = `${formatDistance(new Date(comment.time * 1000), new Date(), {
    includeSeconds: true,
  })} ago`;

  return (
    <div className={classes.commentItem}>
      <p className={classes.commentMeta}>
        {ago} | By: {<Link to={`/user/${comment.by}`}>{comment.by}</Link>}
      </p>
      <div dangerouslySetInnerHTML={{ __html: comment.text! }}></div>
    </div>
  );
}

export default HackerNews;
