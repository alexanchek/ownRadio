import { useCallback } from 'react';

// ICONS
import {
  FaCirclePlay,
  FaCirclePause,
  FaBackwardStep,
  FaForwardStep,
} from 'react-icons/fa6';

import { usePlayerContext } from 'src/Context';
import { localStorageService } from 'src/services/localStorage.service';
import { streams } from 'src/streams';
import { IStream } from 'src/models/stream.interface';

import styles from './ManagedButtons.module.scss';

const getNextStream = (currentStream: IStream) => {
  const findedIndex = streams.findIndex(stream => stream.name === currentStream?.name);

  if (findedIndex === streams.length - 1) {
    const stream = streams[0];
    localStorageService.setItem(stream.name);
    return stream;
  } else {
    const stream = streams[findedIndex + 1];
    localStorageService.setItem(stream.name);
    return stream;
  }
}

const getPrevStream = (currentStream: IStream) => {
  const findedIndex = streams.findIndex(stream => stream.name === currentStream?.name);

  if (findedIndex === 0) {
    const stream = streams[streams.length - 1]
    localStorageService.setItem(stream.name);
    return stream;
  } else {
    const stream = streams[findedIndex - 1];
    localStorageService.setItem(stream.name);
    return stream;
  }
}

const ManagedButtons = () => {
  const { isPlaying, setIsPlaying, currentStream, setCurrentStream, setIsLoading } = usePlayerContext();


  if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('nexttrack', () => {
      const newStream = getNextStream(currentStream!);
      setCurrentStream(newStream);
    })

    navigator.mediaSession.setActionHandler('previoustrack', () => {
      const newStream = getPrevStream(currentStream!);
      setCurrentStream(newStream);
    });
  }

  const onClickPrevNext = useCallback((mode: 'backward' | 'forward') => {
    let newStream: IStream | null = null;
    if (mode === 'backward') newStream = getPrevStream(currentStream!);
    if (mode === 'forward') newStream = getNextStream(currentStream!);

    setCurrentStream(newStream);
    setIsPlaying(true);
    setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStream]);

  return (
    <div className={styles.managedButtonsContainer}>
      <div
        onClick={() => { onClickPrevNext('backward') }}
        onKeyDown={(e) => {
          if (e.code === 'Enter') onClickPrevNext('backward');
        }}
        className={styles.button}
        tabIndex={0}
      >
        <FaBackwardStep size={36} />
      </div>
      <div
        tabIndex={0}
        className={styles.button}
        onClick={() => {
          if (!isPlaying) setIsLoading(true);
          setIsPlaying(!isPlaying);
        }}
        onKeyDown={(e) => {
          if (e.code === 'Enter') {
            if (!isPlaying) setIsLoading(true);
            setIsPlaying(!isPlaying);
          }
        }}
      >
        {isPlaying && <FaCirclePause size={70} />}
        {!isPlaying && <FaCirclePlay size={70} onClick={() => { setIsLoading(true) }} />}
      </div>
      <div
        className={styles.button}
        onClick={() => { onClickPrevNext('forward') }}
        onKeyDown={(e) => {
          if (e.code === 'Enter') onClickPrevNext('forward');
        }}
        tabIndex={0}
      >
        <FaForwardStep size={36} />
      </div>
    </div>
  );
};

export default ManagedButtons;