import { useEffect, useRef } from 'react';
import { usePlayerContext } from '../../Context';
import styles from './Player.module.scss';

let interval = 0;

const Player = () => {
  const playerRef = useRef<HTMLAudioElement | null>(null);

  const { isPlaying, currentStream, setIsLoading, setIsPlaying, } = usePlayerContext();

  useEffect(() => {
    
    if (playerRef.current) {
      playerRef.current.addEventListener('canplaythrough', () => {
        setIsLoading(false);
        console.log('loaded');
      });

      playerRef.current.addEventListener('play', () => {
        setIsPlaying(true);
      });

      playerRef.current.addEventListener('pause', () => {
        setIsPlaying(false);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerRef, setIsLoading])

  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying && currentStream?.url) {
        playerRef.current.src = currentStream?.url;
        playerRef.current.play();
      } else {
        playerRef.current.pause();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, playerRef]);

  useEffect(() => {
    if (currentStream?.url) {
      playerRef.current!.src = currentStream.url;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStream]);

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