import { useCallback, useEffect, useRef, useState } from "react";
import { images } from "./assets";
import audioSrc1 from "./merry_christmas.mp3";
import audioSrc2 from "./merry_christmas.ogg";
import audioSrc3 from "./merry_christmas.wav";

import audioSrc4 from "./rickroll.mp3";
import audioSrc5 from "./rickroll.ogg";
function App() {
  const [enableAudio, setEnableAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement>();
  const audioRef2 = useRef<HTMLAudioElement>();
  const openGift = useCallback(() => {
    setEnableAudio(true);

    const rickroll = Math.random() <= 0.3;
    if (rickroll) {
      if (audioRef2?.current) {
        audioRef2.current.muted = false;
        audioRef2?.current?.play();
      }
    } else {
      if (audioRef?.current) {
        audioRef.current.muted = false;
        audioRef?.current?.play();
      }
    }
  }, []);

  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (enableAudio) {
        return;
      }
      setIsZoomed((prevState) => !prevState);
    }, 500);

    return () => clearInterval(interval);
  }, [enableAudio]);

  return (
    <div
      style={{
        width: "100%",
        height: "95vh",
        position: "relative",
      }}
    >
      <audio
        ref={(input) => {
          if (input != null) {
            audioRef.current = input;
          }
        }}
      >
        <source src={audioSrc1} type="audio/mpeg" />
        <source src={audioSrc2} type="audio/ogg" />
        <source src={audioSrc3} type="audio/wav" />
      </audio>

      <audio
        ref={(input) => {
          if (input != null) {
            audioRef2.current = input;
          }
        }}
      >
        <source src={audioSrc4} type="audio/mpeg" />
        <source src={audioSrc5} type="audio/ogg" />
      </audio>

      {enableAudio ? (
        <>
          <img src={images.card} style={{ width: "100%", height: "100%" }} />
          <img
            src={images.snow}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            onClick={() => setEnableAudio(false)}
          />
        </>
      ) : (
        <div
          onClick={openGift}
          style={{
            display: "flex",
            width: "100vw",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={images.open_gift2} style={{ width: 250, aspectRatio: 1 }} />
          {/* <div
            className=".zoom-periodically "
            style={{
              textOrientation: "mixed", // Allows upright characters
              position: "absolute",
              bottom: 40,
              left: "50%",
              transform: "translateX(-50%)",
              color: "#000",
              fontSize: isZoomed ? 40 : 32,
            }}
          >
            Chạm để mở quà
          </div> */}
        </div>
      )}
    </div>
  );
}

export default App;
