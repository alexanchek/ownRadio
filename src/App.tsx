import { useEffect } from 'react';

// COMPONENTS
import { Player } from 'src/components/Player';

import { usePlayerContext } from 'src/Context';
import { streams } from 'src/streams';

import { localStorageService } from 'src/services/localStorage.service';
import { disableReactDevTools } from 'src/utils/disableDevTools';
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
      <Player />
    </div>
  );
}

export default App;
