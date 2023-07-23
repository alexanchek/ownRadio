import { FC } from 'react';
import { IManagedButtons } from './ManagedButtons.interface';

// ICONS
import {
  FaCirclePlay,
  FaCirclePause,
  FaBackward,
  FaForward,
} from 'react-icons/fa6';

import styles from './ManagedButtons.module.scss';
import { usePlayerContext } from '../../Context';

const ManagedButtons: FC<IManagedButtons> = () => {
  const { isPlaying, setIsPlaying, } = usePlayerContext();

  return (
    <div className={styles.managedButtonsContainer}>
      <div>
        <FaBackward size={36} />
      </div>
      <div onClick={() => {
        setIsPlaying(!isPlaying);
      }}>
        {isPlaying && <FaCirclePause size={70} />}
        {!isPlaying && <FaCirclePlay size={70} />}
      </div>
      <div>
        <FaForward size={36} />
      </div>
    </div>
  );
};

export default ManagedButtons;