import ErrorGIF from "../assets/error.gif";

const LoadError: React.FC = () => {
  return (
    <div style={{display:"flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
      <div
        style={{
          backgroundImage: `url(${ErrorGIF})`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          minHeight: 64,
          minWidth: 64
        }}
      ></div>
      <p>Something goes wrong...</p>
    </div>
  );
};

export default LoadError;
