import { Status } from './Status';
import { TrackInfo } from './TrackInfo';
import { AudioElement } from './AudioElement';
import { ManagedButtons } from './ManagedButtons';
import styles from './Player.module.scss';

const Player = () => {
  return (
    <div className={styles.container}>
      <TrackInfo />
      <ManagedButtons />
      <Status />
      <AudioElement />
    </div>
  );
};

export default Player;