import { useCallback } from 'react';

// ICONS
import {
  FaCirclePlay,
  FaCirclePause,
  FaBackwardStep,
  FaForwardStep,
} from 'react-icons/fa6';

import { usePlayerContext } from '../../Context';
import { streams } from '../../streams';
import { localStorageService } from '../../services/localStorage.service';
import { IStream } from '../../models/stream.interface';

import styles from './ManagedButtons.module.scss';

const getNextStream = (currentStream: IStream) => {
  const findedIndex = streams.findIndex(stream => stream.name === currentStream?.name );

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
  const findedIndex = streams.findIndex(stream => stream.name === currentStream?.name );

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
  const { isPlaying, setIsPlaying, currentStream, setCurrentStream, } = usePlayerContext();

  
  if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('nexttrack', () => {
      const newStream =  getNextStream(currentStream!);
      setCurrentStream(newStream);
    })

    navigator.mediaSession.setActionHandler('previoustrack', () => {
      const newStream =  getPrevStream(currentStream!);
      setCurrentStream(newStream);
    });
  }

  const onClickBackward = useCallback(() => {
    const newStream = getPrevStream(currentStream!);
    setCurrentStream(newStream);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStream]);

  const onClickForward = useCallback(() => {
    const newStream = getNextStream(currentStream!);
    setCurrentStream(newStream);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStream]);

  return (
    <div className={styles.managedButtonsContainer}>
      <div
        onClick={onClickBackward}
      >
        <FaBackwardStep size={36} />
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
        <FaForwardStep size={36} />
      </div>
    </div>
  );
};

export default ManagedButtons;