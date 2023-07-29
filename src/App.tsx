import { useEffect } from 'react';

// COMPONENTS
import { HeaderMenu } from './components/HeaderMenu';
import { ManagedButtons } from './components/ManagedButtons';
import { TrackInfo } from './components/TrackInfo';
import { Player } from './components/Player';
import { Status } from './components/Status';
import { Sidebar } from './components/Sidebar';

import { usePlayerContext } from './Context';
import { streams } from './streams';

import { localStorageService } from './services/localStorage.service';
import { disableReactDevTools } from './utils/disableDevTools';
import './App.css';

const App = () => {
  const { setCurrentStream } = usePlayerContext();

  if (process.env.NODE_ENV !== 'development') {
    disableReactDevTools();
  }

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
