import { useEffect, useRef } from "react";

const ShowreelPlayer = ({ src, poster }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.25;
    }
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      controls
      playsInline
      className="w-full h-full"
    />
  );
};

export default ShowreelPlayer;