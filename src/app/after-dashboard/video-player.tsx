import { useEffect, useRef } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const YouTubePlayer: React.FC<{
  videoId: string;
  setCurrentTime: any;
  setTotalLength: any;
}> = ({ videoId, setCurrentTime, setTotalLength }) => {
  const playerRef = useRef<HTMLVideoElement | null>(null);

  // useEffect(() => {
  //   if (!playerRef.current) return;

  //   const onYouTubeIframeAPIReady = () => {
  //     new window.YT.Player(playerRef.current, {
  //       height: "100%",
  //       width: "100%",
  //       videoId: videoId,
  //       events: {
  //         onReady: onPlayerReady,
  //         onStateChange: onPlayerStateChange,
  //       },
  //     });
  //   };

  //   if (!window.YT) {
  //     const tag = document.createElement("script");
  //     tag.src = "https://www.youtube.com/iframe_api";
  //     const firstScriptTag = document.getElementsByTagName("script")[0];
  //     firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);
  //     window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  //   } else {
  //     onYouTubeIframeAPIReady();
  //   }
  // }, [videoId]);

  // const onPlayerReady = (event: any) => {
  //   event.target.playVideo();
  //   setTotalLength(event.target.getDuration())
  // };

  // const onPlayerStateChange = (event: any) => {
  //   if (event.data === window.YT.PlayerState.PLAYING) {
  //     setInterval(() => {
  //       setCurrentTime(event.target.getCurrentTime());
  //     }, 1000); // Set current time every second
  //   }
  // };

    useEffect(() => {
      console.log("Video things...")
      const video = playerRef.current;
      if (!video) return;

      console.log("Video handling logic")
      const handleTimeUpdate = () => {
        console.log({ time: video.currentTime })
        setCurrentTime(video.currentTime);
      };

      const handleLoadedMetadata = () => {
        console.log({ totalTime: video.duration })
        setTotalLength(video.duration);
        video.play();
      };

      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);

      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }, [playerRef, setCurrentTime, setTotalLength]);

  return <div className="w-full h-auto md:h-[calc(100vh-195px)]">
    <video ref={playerRef} src="/assets/vertical-video.mp4" />
  </div>;
};

export default YouTubePlayer;
