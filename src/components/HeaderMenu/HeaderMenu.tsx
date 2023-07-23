import { FC } from 'react';
import { usePlayerContext } from '../../Context';
import { IHeaderMenu } from './HeaderMenu.interface';
import styles from './HeaderMenu.module.scss';

const HeaderMenu: FC<IHeaderMenu> = () => {
  const { currentStream } = usePlayerContext();

  return (
    <div className={styles.streamsContainer}>
      {currentStream?.name}
    </div>
  );
};

export default HeaderMenu;