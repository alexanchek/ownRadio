import { FC, PropsWithChildren, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './Offline.module.scss';

const Offline: FC<PropsWithChildren> = ({
  children,
}) => {
  const [online, setOnline] = useState(navigator.onLine);

  const handleOnlineStatusChange = () => {
    setOnline(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  return (
    <>
      <div className={cn(styles.offline, {
        [styles.visible]: !online,
      })}>
        <div className={styles.offlineBox}>
          <div className={styles.offlineTitle}>Ой, нет интернета</div>
          <div className={styles.offlineText}>Проверьте интернет. Он куда-то пропал :(</div>
        </div>
      </div>
      <div className={cn(styles.overlay, {
        [styles.visible]: !online,
      })} />
      {children}
    </>
  );
};

export default Offline;