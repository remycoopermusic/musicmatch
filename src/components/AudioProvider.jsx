import React, { createContext, useState, useContext, useRef, useEffect } from 'react';

    const AudioContext = createContext();

    export const useAudio = () => {
      const context = useContext(AudioContext);
      if (!context) {
        throw new Error('useAudio must be used within an AudioProvider');
      }
      return context;
    };

    const AudioProvider = ({ children }) => {
      const audioRef = useRef(new Audio());
      const [currentTrack, setCurrentTrack] = useState(null);
      const [isPlaying, setIsPlaying] = useState(false);
      const [progress, setProgress] = useState(0);
      const [duration, setDuration] = useState(0);

      useEffect(() => {
        const audio = audioRef.current;

        const handleTimeUpdate = () => {
          setProgress(audio.currentTime / audio.duration || 0);
        };

        const handleLoadedMetadata = () => {
          setDuration(audio.duration);
        };

        const handleEnded = () => {
          setIsPlaying(false);
          setProgress(0);
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);

        return () => {
          audio.removeEventListener('timeupdate', handleTimeUpdate);
          audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
          audio.removeEventListener('ended', handleEnded);
          audio.pause();
        };
      }, []);

      const playTrack = async (track) => {
        try {
          if (currentTrack !== track) {
            audioRef.current.src = track;
            setCurrentTrack(track);
          }
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error('Error playing track:', error);
          setIsPlaying(false);
        }
      };

      const pauseTrack = () => {
        audioRef.current.pause();
        setIsPlaying(false);
      };

      const seekTrack = (value) => {
        const time = value * duration;
        audioRef.current.currentTime = time;
        setProgress(value);
      };

      return (
        <AudioContext.Provider 
          value={{ 
            currentTrack, 
            isPlaying, 
            progress, 
            duration,
            playTrack, 
            pauseTrack, 
            seekTrack 
          }}
        >
          {children}
        </AudioContext.Provider>
      );
    };

    export default AudioProvider;
