import React from 'react';
    import { useAudio } from './AudioProvider';
    import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

    const AudioPlayer = ({ song }) => {
      const { currentTrack, isPlaying, playTrack, pauseTrack, seekTrack, progress } = useAudio();
      const isCurrentSong = currentTrack === song.audioUrl;

      return (
        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => isPlaying && isCurrentSong ? pauseTrack() : playTrack(song.audioUrl)}
              className="p-2 rounded-full bg-pink-500 hover:bg-pink-600 transition-colors"
            >
              {isPlaying && isCurrentSong ? (
                <PauseIcon className="w-6 h-6 text-white" />
              ) : (
                <PlayIcon className="w-6 h-6 text-white" />
              )}
            </button>
            
            <div className="flex-1">
              <div className="relative w-full h-2 bg-gray-200 rounded-full">
                <div 
                  className="absolute h-full bg-pink-500 rounded-full"
                  style={{ width: `${progress * 100}%` }}
                />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={progress}
                  onChange={(e) => seekTrack(e.target.value)}
                  className="absolute w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      );
    };

    export default AudioPlayer;
