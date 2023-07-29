import { useCallback } from 'react';

// ICONS
import {
  FaCirclePlay,
  FaCirclePause,
  FaBackward,
  FaForward,
} from 'react-icons/fa6';

import styles from './ManagedButtons.module.scss';
import { usePlayerContext } from '../../Context';
import { streams } from '../../streams';
import { localStorageService } from '../../services/localStorage.service';

const ManagedButtons = () => {
  const { isPlaying, setIsPlaying, currentStream, setCurrentStream, } = usePlayerContext();

  
  if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('nexttrack', () => {
      const findedIndex = streams.findIndex(stream => stream.name === currentStream?.name );
    
      if (findedIndex === streams.length - 1) {
        const stream = streams[0];
        setCurrentStream(stream);
        localStorageService.setItem(stream.name);
      } else {
        const stream = streams[findedIndex + 1];
        setCurrentStream(stream);
        localStorageService.setItem(stream.name);
      }
    })

    navigator.mediaSession.setActionHandler('previoustrack', () => {
      const findedIndex = streams.findIndex(stream => stream.name === currentStream?.name );
    
      if (findedIndex === 0) {
        const stream = streams[streams.length - 1]
        setCurrentStream(stream);
        localStorageService.setItem(stream.name);
      } else {
        const stream = streams[findedIndex - 1];
        setCurrentStream(stream);
        localStorageService.setItem(stream.name);
      }
    });
  }

  const onClickBackward = useCallback(() => {
    const findedIndex = streams.findIndex(stream => stream.name === currentStream?.name );
    
    if (findedIndex === 0) {
      const stream = streams[streams.length - 1]
      setCurrentStream(stream);
      localStorageService.setItem(stream.name);
    } else {
      const stream = streams[findedIndex - 1];
      setCurrentStream(stream);
      localStorageService.setItem(stream.name);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStream]);

  const onClickForward = useCallback(() => {
    const findedIndex = streams.findIndex(stream => stream.name === currentStream?.name );
    
    if (findedIndex === streams.length - 1) {
      const stream = streams[0];
      setCurrentStream(stream);
      localStorageService.setItem(stream.name);
    } else {
      const stream = streams[findedIndex + 1];
      setCurrentStream(stream);
      localStorageService.setItem(stream.name);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStream]);

  return (
    <div className={styles.managedButtonsContainer}>
      <div
        onClick={onClickBackward}
      >
        <FaBackward size={36} />
      </div>
      <div onClick={() => {
        setIsPlaying(!isPlaying);
      }}>
        {isPlaying && <FaCirclePause size={70} />}
        {!isPlaying && <FaCirclePlay size={70} />}
      </div>
      <div
        onClick={onClickForward}
      >
        <FaForward size={36} />
      </div>
    </div>
  );
};

export default ManagedButtons;