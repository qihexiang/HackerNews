import LoadingGIF from "../assets/loading.gif";

const Loading: React.FC = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${LoadingGIF})`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        minHeight: 64,
        minWidth: 64,
      }}
    ></div>
  );
};

export default Loading;
