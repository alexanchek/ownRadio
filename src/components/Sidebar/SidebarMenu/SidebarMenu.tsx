import { Dispatch, FC, SetStateAction, useCallback } from 'react';
import { usePlayerContext } from '../../../Context';
import { IStream } from '../../../models/stream.interface';
import { streams } from '../../../streams';
import cn from 'classnames';
import styles from './SidebarMenu.module.scss';
import { localStorageService } from '../../../services/localStorage.service';

const SidebarMenu: FC<{ setIsOpen: Dispatch<SetStateAction<boolean>> }> = ({ setIsOpen, }) => {
  const { setCurrentStream, isPlaying, currentStream, setIsLoading } = usePlayerContext();

  const onClick = useCallback((stream: IStream) => {
    setIsOpen(false);
    setCurrentStream(stream);
    localStorageService.setItem(stream.name);
    setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, currentStream, setIsOpen])

  return (
    <div className={styles.menu}>
      {streams.map(stream => {
        return (
          <div
            className={cn(styles.stream, {
              [styles.active]: stream.name === currentStream?.name,
            })}
            key={stream.name}
            onClick={(e) => onClick(stream)}>
            {stream.name}
          </div>
        )
      })}
    </div>
  );
};

export default SidebarMenu;