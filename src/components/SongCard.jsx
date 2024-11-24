import React from 'react';
    import { useAudio } from './AudioProvider';

    const SongCard = ({ song }) => {
      const { currentTrack, isPlaying, playTrack, pauseTrack, seekTrack, progress } = useAudio();

      return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6 transform transition-transform hover:scale-105">
          <img src={song.artworkUrl} alt={song.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{song.title}</h2>
            <p className="text-sm text-gray-600 mb-4">{song.description}</p>
            <div className="flex items-center space-x-4 mb-4">
              <button
                className="py-2 px-4 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full"
                onClick={() => (isPlaying && currentTrack === song.audioUrl ? pauseTrack() : playTrack(song.audioUrl))}
              >
                {isPlaying && currentTrack === song.audioUrl ? 'Pause' : 'Play'}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={progress}
                onChange={(e) => seekTrack(e.target.value * audioRef.current.duration)}
                className="w-full"
              />
            </div>
            <div className="flex justify-between">
              <button className="py-2 px-4 bg-green-500 text-white rounded-full">Like</button>
              <button className="py-2 px-4 bg-red-500 text-white rounded-full">Dislike</button>
            </div>
          </div>
        </div>
      );
    };

    export default SongCard;
