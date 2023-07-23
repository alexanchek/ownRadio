import { FC, useEffect, useRef } from 'react';
import { usePlayerContext } from '../../Context';
import { IPlayer } from './Player.interface';
import styles from './Player.module.scss';

const Player: FC<IPlayer> = () => {
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
        //@ts-ignore
        AndroidInterface.showToast(`Загружаем "${currentStream?.name}"`);
      })

      playerRef.current.addEventListener('pause', () => {
        setIsPlaying(false);
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerRef, setIsLoading])

  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying && currentStream?.url) {
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