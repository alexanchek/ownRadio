import styles from './TrackInfo.module.scss';
import { usePlayerContext } from '../../Context';

const TrackInfo = () => {
  const { currentStream, currentSong } =usePlayerContext();

  return (
    <div className={styles.infoContainer}>
      <img src={currentStream?.cover} alt='cover' className={styles.cover} />
      <div>
        <div className={styles.songArtist}>{currentSong ? currentSong.artist : currentStream?.name}</div>
        <div className={styles.songTitle}>{ currentSong ? currentSong.title : currentStream?.extra} </div>
      </div>

    </div>
  );
};

export default TrackInfo;