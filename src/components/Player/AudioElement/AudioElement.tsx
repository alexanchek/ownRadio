import { useEffect, useRef } from 'react';
import { usePlayerContext } from 'src/Context';
import styles from './AudioElement.module.scss';

const AudioElement = () => {
  const playerRef = useRef<HTMLAudioElement | null>(null);
  
  const { isPlaying, currentStream, setIsLoading, setIsPlaying, } = usePlayerContext();

  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying && currentStream?.url) {
        playerRef.current.src = '';
        playerRef.current.src = currentStream.url;
        
        // race between pause and play so we need to check it out to prevent a device from throwing the error
        if (!playerRef.current.paused) playerRef.current.play();
      } else {
        playerRef.current.pause();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, playerRef, currentStream]);

  useEffect(() => {
    
    if (playerRef.current) {
      
      if (!playerRef.current.paused) {
        setIsLoading(false);
      }

      playerRef.current.addEventListener('canplaythrough', () => {
        setIsLoading(false);
      });

      playerRef.current.addEventListener('play', () => {
        setIsPlaying(true);
      });

      playerRef.current.addEventListener('pause', () => {
        setIsPlaying(false);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerRef, setIsLoading, currentStream])

  useEffect(() => {
    if (currentStream?.url) {
      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying,currentStream]);

  return (
    <audio
      id='audio'
      ref={playerRef}
      controls
      autoPlay
      className={styles.audio}
    >
      <source src={currentStream?.url} />
    </audio>
  );
};

export default AudioElement;