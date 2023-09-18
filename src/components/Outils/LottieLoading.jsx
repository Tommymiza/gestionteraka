import React from "react";

export default function LottieLoading({speed, size}) {
  return (
    <>
      <lottie-player
        src="./images/Lotties/blue-loading.json"
        background="transparent"
        speed={speed}
        style={{ width: size, height: size }}
        loop
        autoplay
      ></lottie-player>
    </>
  );
}
