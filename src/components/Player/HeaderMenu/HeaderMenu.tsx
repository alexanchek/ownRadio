import { usePlayerContext } from 'src/Context';
import styles from './HeaderMenu.module.scss';

const HeaderMenu = () => {
  const { currentStream } = usePlayerContext();

  return (
    <div className={styles.streamsContainer}>
      {currentStream?.name}
    </div>
  );
};

export default HeaderMenu;