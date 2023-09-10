import { Dispatch, FC, SetStateAction, useCallback } from 'react';
import { usePlayerContext } from 'src/Context';
import { IStream } from 'src/models/stream.interface';
import { streams } from 'src/streams';
import cn from 'classnames';
import styles from './SidebarMenu.module.scss';
import { localStorageService } from 'src/services/localStorage.service';

const SidebarMenu: FC<{ setIsOpen: Dispatch<SetStateAction<boolean>>, isOpen: boolean }> = ({
  setIsOpen,
  isOpen,
}) => {
  const { setCurrentStream, isPlaying, currentStream, setIsPlaying, setIsLoading } = usePlayerContext();

  const onClick = useCallback((stream: IStream) => {
    setIsOpen(false);
    setCurrentStream(stream);
    localStorageService.setItem(stream.name);
    setIsPlaying(true);
    setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, currentStream, setIsOpen])

  return (
    <div className={styles.menu}>
      {streams.map(stream => {
        return (
          <div
            tabIndex={isOpen ? 0 : -1}
            className={cn(styles.stream, {
              [styles.active]: stream.name === currentStream?.name,
            })}
            key={stream.name}
            onClick={() => onClick(stream)}
            onKeyDown={(e) => {
              if (e.code === 'Enter') onClick(stream);
            }}
          >
            {stream.name}
          </div>
        )
      })}
    </div>
  );
};

export default SidebarMenu;