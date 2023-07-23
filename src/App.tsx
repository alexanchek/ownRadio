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

const App = () => {
  const { setCurrentStream } = usePlayerContext();

  useEffect(() => {
    setCurrentStream(streams[0]);
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
