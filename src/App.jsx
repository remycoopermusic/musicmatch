import React, { useState, useCallback } from 'react';
    import AudioProvider from './components/AudioProvider';
    import SwipeableCard from './components/SwipeableCard';

    const sampleSongs = [
      {
        id: 1,
        title: 'Summer Vibes',
        description: 'Feel-good summer track with tropical house elements',
        story: 'Created during a beach session in Ibiza...',
        audioUrl: 'https://audio-previews.elements.envatousercontent.com/files/103682271/preview.mp3',
        artworkUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800',
        creators: [
          { name: 'John Doe', role: 'Producer' },
          { name: 'Jane Smith', role: 'Songwriter' },
        ],
      },
      {
        id: 2,
        title: 'Midnight Dreams',
        description: 'Atmospheric electronic track with deep bass',
        story: 'Inspired by late night studio sessions...',
        audioUrl: 'https://audio-previews.elements.envatousercontent.com/files/103682272/preview.mp3',
        artworkUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800',
        creators: [
          { name: 'Mike Johnson', role: 'Producer' },
          { name: 'Sarah Wilson', role: 'Songwriter' },
        ],
      },
    ];

    function App() {
      const [currentIndex, setCurrentIndex] = useState(0);
      const [likedSongs, setLikedSongs] = useState([]);
      const [dislikedSongs, setDislikedSongs] = useState([]);

      const handleSwipe = useCallback((direction) => {
        if (currentIndex >= sampleSongs.length) return;

        const currentSong = sampleSongs[currentIndex];
        if (direction === 'right') {
          setLikedSongs(prev => [...prev, currentSong]);
        } else {
          setDislikedSongs(prev => [...prev, currentSong]);
        }
        setCurrentIndex(prev => prev + 1);
      }, [currentIndex]);

      const remainingSongs = sampleSongs.length - currentIndex;

      return (
        <AudioProvider>
          <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
            <div className="max-w-md mx-auto pt-10 px-4">
              {remainingSongs > 0 ? (
                <div className="relative h-[600px]">
                  {sampleSongs.slice(currentIndex).map((song, index) => (
                    <SwipeableCard
                      key={song.id}
                      song={song}
                      onSwipe={handleSwipe}
                      active={index === 0}
                    />
                  )).reverse()}
                </div>
              ) : (
                <div className="h-[600px] flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No More Songs</h2>
                    <p className="text-gray-600">You've gone through all available songs!</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </AudioProvider>
      );
    }

    export default App;
