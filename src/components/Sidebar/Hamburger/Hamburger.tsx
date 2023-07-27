import { Dispatch, FC, SetStateAction, CSSProperties } from 'react';
import cn from 'classnames';
import styles from './Hamburger.module.scss';

export interface IHamburger {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const Hamburger: FC<IHamburger> = ({
  isOpen,
  setIsOpen,
}) => {
  const style: CSSProperties = {
    left: isOpen ? '60vw' : '3vw',
  }

  return (
    <div
      className={cn(styles.hamburger, {
        [styles.isOpen]: isOpen,
      })}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={cn({
        [styles.first]: isOpen,
      })} />
      <div className={cn({
        [styles.second]: isOpen,
      })} />
      <div className={cn({
        [styles.three]: isOpen,
      })} />
    </div>
  );
};

export default Hamburger;