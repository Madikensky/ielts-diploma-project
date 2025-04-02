"use client";

import { FC, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

interface AudioPlayerProps {
  src: string;
  part: string;
}

export const AudioPlayer: FC<AudioPlayerProps> = ({ src, part }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;
    console.log("clicked");

    if (isPlaying) {
      // audioRef.current.;
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const percent =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(percent);
  };

  return (
    <div className="bg-gray-200 rounded-xl p-4 flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-2 font-semibold">
          <div
            className={`w-10 h-10 border ${
              isPlaying
                ? "border bg-gray-300 border-gray-300"
                : "border-borderCommon bg-bgCommon"
            }  rounded`}
          />
          {part} Recording
        </div>
        <div className="flex items-center gap-4 rounded-lg">
          <button
            onClick={togglePlay}
            className={`p-2 rounded-full ${
              isPlaying ? "bg-gray-300" : " bg-bgCommon"
            }`}
            disabled={isPlaying}
          >
            {isPlaying ? (
              <Pause size={10} color="white" fill="white" />
            ) : (
              <Play size={10} color="white" fill="white" />
            )}
          </button>
          <audio
            ref={audioRef}
            src={src}
            onTimeUpdate={handleTimeUpdate}
          ></audio>
        </div>
      </div>
      <div className="w-full h-2 bg-gray-400 rounded-full overflow-hidden">
        <div
          className="h-full bg-bgCommon transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
