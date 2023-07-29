import { useEffect, useRef } from 'react';
import { usePlayerContext } from '../../Context';
import styles from './Player.module.scss';

const Player = () => {
  const playerRef = useRef<HTMLAudioElement | null>(null);

  const { isPlaying, currentStream, setIsLoading, setIsPlaying, } = usePlayerContext();

  useEffect(() => {
    
    if (playerRef.current) {
      if (playerRef.current.readyState === 3) {
        setIsLoading(false);
      }

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
    if (playerRef.current) {
      if (isPlaying && currentStream?.url) {
        playerRef.current.src = currentStream.url;
        playerRef.current.play();
      } else {
        playerRef.current.pause();
        playerRef.current.src = '';
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, playerRef, currentStream]);

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

export default Player;