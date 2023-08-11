import LoadingGIF from "../assets/loading.gif";

const Loading: React.FC = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${LoadingGIF})`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    ></div>
  );
};

export default Loading;
