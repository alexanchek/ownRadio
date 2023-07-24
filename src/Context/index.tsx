import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useState } from "react";
import { IStream } from "../models/stream.interface";

export interface IPlayerContext {
  isPlaying: boolean;
  isLoading: boolean;
  currentStream: IStream | null;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setCurrentStream: Dispatch<SetStateAction<IStream | null>>;
}

const PlayerContext = createContext({} as IPlayerContext);

const PlayerContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStream, setCurrentStream] = useState<IStream | null>(null);
    
  return (
    <PlayerContext.Provider value={{
      isPlaying, 
      isLoading,
      currentStream,
      setIsPlaying,
      setIsLoading,
      setCurrentStream,
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