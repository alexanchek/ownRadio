import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useState } from "react";
import { ISong } from "../models/song.interface";
import { IStream } from "../models/stream.interface";

export interface IPlayerContext {
  isPlaying: boolean;
  isLoading: boolean;
  currentStream: IStream | null;
  currentSong: ISong | null;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setCurrentStream: Dispatch<SetStateAction<IStream | null>>;
  setCurrentSong: Dispatch<SetStateAction<ISong | null>>;
}

const PlayerContext = createContext({} as IPlayerContext);

const PlayerContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStream, setCurrentStream] = useState<IStream | null>(null);
  const [currentSong, setCurrentSong] = useState<ISong | null>(null);
    
  return (
    <PlayerContext.Provider value={{
      isPlaying, 
      isLoading,
      currentStream,
      currentSong,
      setIsPlaying,
      setIsLoading,
      setCurrentStream,
      setCurrentSong,
    }}>
      {children}
    </PlayerContext.Provider>
  )

};

const usePlayerContext = () => {
  const activePlayerContext = useContext(PlayerContext);
  return activePlayerContext;
}

export { PlayerContext, usePlayerContext, PlayerContextProvider };