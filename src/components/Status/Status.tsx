import { usePlayerContext } from '../../Context';
import styles from './status.module.scss';

const Status = () => {
  const { isLoading, } = usePlayerContext();
  console.log(isLoading);

  return (
    <div className={styles.status}>
      {isLoading
        ? (<div className={styles.ldsRing}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>)
        : ''}
    </div>
  );
};

export default Status;