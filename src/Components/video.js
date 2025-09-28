import { useRef } from "react";
function CustomVideoPlayer() {
  const videoRef = useRef(null);

  return (
    <div className="relative w-full h-screen">
      <video
        ref={videoRef}
        className="w-full h-2/5 object-cover"
        loop
        muted
        autoPlay
      >
        <source src="/fa.mp4" type="video/mp4" />
      </video>

     
    </div>
  );
}

export default CustomVideoPlayer;
