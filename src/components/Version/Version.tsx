import system from '../../../package.json';
import styles from './Version.module.scss';

const Version = () => {
  const currentVersion = `v: ${system.version}`

  return (
    <div className={styles.version}>
      { currentVersion }
    </div>
  );
};

export default Version;