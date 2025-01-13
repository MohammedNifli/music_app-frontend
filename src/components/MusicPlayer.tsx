import React, { useEffect, useCallback } from 'react';
import { 
  Heart, 
  SkipBack, 
  SkipForward, 
  Play, 
  Pause, 
  Repeat, 
  Maximize2, 
  ChevronDown, 
  Download 
} from 'lucide-react';
import { useSong } from '../hooks/useSong';
import { PlayerState } from '../types/song.types';

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const MusicPlayer = () => {
  const [playerState, setPlayerState] = React.useState<PlayerState>({
    isPlaying: false,
    progress: 0,
  });
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration,] = React.useState(183); 

  const { data: song, isLoading } = useSong();

  const togglePlay = () => {
    setPlayerState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying,
    }));
  };

  const updateProgress = useCallback(() => {
    if (currentTime < duration) {
      setCurrentTime(prev => prev + 1);
      setPlayerState(prev => ({
        ...prev,
        progress: (currentTime / duration) * 100,
      }));
    } else {
      setPlayerState(prev => ({ ...prev, isPlaying: false }));
      setCurrentTime(0);
    }
  }, [currentTime, duration]);

  useEffect(() => {
    let progressInterval: number | undefined;

    if (playerState.isPlaying) {
      progressInterval = setInterval(updateProgress, 1000);
    }

    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [playerState.isPlaying, updateProgress]);

  const handleProgressBarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = event.currentTarget;
    const clickPosition = event.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.offsetWidth;
    const percentage = (clickPosition / progressBarWidth) * 100;
    const newTime = (percentage / 100) * duration;
    
    setCurrentTime(newTime);
    setPlayerState(prev => ({
      ...prev,
      progress: percentage,
    }));
  };

  if (isLoading || !song) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-blue-950">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-blue-950 p-4">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-gray-900 rounded-3xl p-4 sm:p-6 md:p-8 text-white">

        <div className="flex  justify-between items-center mb-4 sm:mb-6 md:mb-8">
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-xs sm:text-sm text-gray-400">PLAYING FROM PLAYLIST</span>
          <div className="w-5 h-5 sm:w-6 sm:h-6">⋮</div>
        </div>

      
        <div className="relative w-full max-w-xs mx-auto aspect-square mb-4 sm:mb-6 md:mb-8">
          <img
            src={song.coverArt}
            alt={`${song.title} by ${song.artist}`}
            className="w-full h-full object-cover rounded-full shadow-lg"
          />
        </div>

      
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1">{song.title}</h2>
          <p className="text-sm sm:text-base text-gray-400">{song.artist}</p>
        </div>

     
        <div className="text-center mb-4 sm:mb-6 text-sm sm:text-base text-gray-400">
          {song.lyrics}
        </div>

      
        <div className="mb-4 sm:mb-6">
          <div 
            className="w-full bg-gray-700 h-1 rounded-full cursor-pointer"
            onClick={handleProgressBarClick}
          >
            <div 
              className="bg-blue-500 h-1 rounded-full transition-all duration-300"
              style={{ width: `${playerState.progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs sm:text-sm mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

      
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <Maximize2 className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 hover:text-white transition-colors" />
          <div className="flex items-center gap-4 sm:gap-8">
            <SkipBack className="w-5 h-5 sm:w-6 sm:h-6 hover:text-gray-300 transition-colors cursor-pointer" />
            <button 
              onClick={togglePlay}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              {playerState.isPlaying ? 
                <Pause className="w-5 h-5 sm:w-6 sm:h-6" /> : 
                <Play className="w-5 h-5 sm:w-6 sm:h-6" />
              }
            </button>
            <SkipForward className="w-5 h-5 sm:w-6 sm:h-6 hover:text-gray-300 transition-colors cursor-pointer" />
          </div>
          <Repeat className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 hover:text-white transition-colors cursor-pointer" />
        </div>

        
        <div className="flex justify-between items-center">
          <Download className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 hover:text-white transition-colors cursor-pointer" />
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 hover:text-white transition-colors cursor-pointer" />
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 hover:text-white transition-colors cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;