import { usePlayerContext } from '../../Context';
import { useEffect, useState } from 'react';
import { IStream } from '../../models/stream.interface';
import { ISong } from '../../models/song.interface';
import styles from './TrackInfo.module.scss';

let interval: any = null;

const TrackInfo = () => {
  const { currentStream } = usePlayerContext();
  const [intervalStream, setIntervalStream] = useState<IStream | null>(null);
  const [trackInfo, setTrackInfo] = useState<ISong | null>(null);

  const mediadata = new MediaMetadata();


  useEffect(() => {
    const getTitle = async () => {
      console.log('interval', currentStream?.name);

      if (currentStream && currentStream.titleUrl) {
        const data = await currentStream.titleUrl();
        setTrackInfo(data);

        if ("mediaSession" in navigator) {
          if (intervalStream?.name !== currentStream?.name) {
            navigator.mediaSession.metadata = new MediaMetadata({
            artist: data?.artist ? data.artist : 'Сашкино радио',
            title: data?.title ? data.title : '',
            artwork: data?.cover
              ? [{ src: data.cover, sizes: '256x256', type: 'image/jpg' }]
              : [{ src: currentStream.cover }],
          });
        }
          }
      }
    }

    if (!interval && intervalStream?.name !== currentStream?.name) {
      setIntervalStream(currentStream);
      interval = setInterval(() => {
        getTitle();
      }, 5000);
    } else if (currentStream?.name !== intervalStream?.name) {
      clearInterval(interval);
      setTrackInfo(null);
      setIntervalStream(currentStream);
      interval = setInterval(() => {
        getTitle();
      }, 5000);

      if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          artist: 'Сашкино радио',
          title: '',
          album: '',
          artwork: [{ src: currentStream!.cover }],
        });
      }
    }
  }, [currentStream, intervalStream]);

  useEffect(() => {
    return () => {
      interval = null;
    }
  }, [])

  return (
    <div className={styles.infoContainer}>
      <img src={trackInfo?.cover ? trackInfo?.cover : currentStream?.cover} alt='cover' className={styles.cover} />
      <div>
        <div className={styles.songArtist}>{trackInfo?.artist ? trackInfo.artist : currentStream?.name}</div>
        <div className={styles.songTitle}>{trackInfo?.title ? trackInfo.title : currentStream?.extra} </div>
      </div>
    </div>
  );
};

export default TrackInfo;