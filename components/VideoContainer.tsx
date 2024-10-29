"use client";

import { useEffect, useRef } from "react";

interface iVideoContainer {
    stream: MediaStream | null;
    isLocalStream: boolean,
    isOnCall: boolean,
}

const VideoContainer = ({stream, isLocalStream, isOnCall}: iVideoContainer) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if(videoRef.current && stream) {
        videoRef.current.srcObject = stream;
    }
  }, [stream]);
  return (
    <video className={`rounded border w-[800px] ${!isLocalStream && isOnCall && "w-[200px] z-40 top-4 left-4 absolute border-purple-500 border-2"}`} ref={videoRef} autoPlay playsInline muted={isLocalStream} />
  )
}

export default VideoContainer