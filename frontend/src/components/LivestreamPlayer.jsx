import { useState, useEffect, useRef } from "react";
import { getOverlays, createOverlay } from "../api";
import Hls from "hls.js";
import PropTypes from "prop-types";


const LivestreamPlayer = ({ videoUrl, overlays }) => {
  // const [overlays, setOverlays] = useState([]);
  const videoRef = useRef(null);


  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
      });
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = videoUrl;
      videoRef.current.addEventListener("loadedmetadata", () => {
        videoRef.current.play();
      });
    }
  }, [videoUrl]);
  return (
    <div className="relative w-full max-w-4xl mx-auto mt-10 shadow-xl">
      <video
        ref={videoRef}
        controls
        autoPlay
        muted
        className="w-full h-full rounded-lg shadow-xl"
      ></video>

      {overlays.map((overlay) => (
        <div
          key={overlay._id}
          className="absolute bg-opacity-50 text-white flex items-center justify-center"
          style={{
            top: `${overlay.position.y}px`,
            left: `${overlay.position.x}px`,
            width: `${overlay.size.width}px`,
            height: `${overlay.size.height}px`,
          }}
        >
          {overlay.overlay_type === "text" ? (
            <p className="text-center">{overlay.content}</p>
          ) : overlay.overlay_type === "image" ? (
            <img
              src={overlay.content}
              alt="overlay"
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>
      ))}
    </div>
  );
};
LivestreamPlayer.propTypes = {
  videoUrl: PropTypes.string
}

export default LivestreamPlayer;

