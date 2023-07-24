// COMPONENTS
import { HeaderMenu } from './components/HeaderMenu';
import { ManagedButtons } from './components/ManagedButtons';
import { TrackInfo } from './components/TrackInfo';
import { Player } from './components/Player';

import { usePlayerContext } from './Context';
import { useEffect } from 'react';
import { streams } from './streams';
import './App.css';
import { Status } from './components/Status';
import { Sidebar } from './components/Sidebar';
import { localStorageService } from './services/localStorage.service';

const App = () => {
  const { setCurrentStream } = usePlayerContext();

  useEffect(() => {
    if (!localStorageService.getItem()) {
      setCurrentStream(streams[0]);
      localStorageService.setItem(streams[0].name);
    } else {
      const streamFromStorage = localStorageService.getItem();
      const currentStream = streams.find(stream => stream.name === streamFromStorage);
      setCurrentStream(currentStream ?? streams[0]);
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
        <Sidebar />
        <HeaderMenu />
        <div className="container">
          <TrackInfo />
          <ManagedButtons />
          <Status />
          <Player />
        </div>

    </div>
  );
}

export default App;
