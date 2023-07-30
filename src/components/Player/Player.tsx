import { Sidebar } from '../Sidebar';
import { Status } from '../Status';
import { TrackInfo } from '../TrackInfo';
import { AudioElement } from './AudioElement';
import { HeaderMenu } from './HeaderMenu';
import { ManagedButtons } from './ManagedButtons';

const Player = () => {
  return (
    <>
      <Sidebar />
        <HeaderMenu />
        <div className="container">
          <TrackInfo />
          <ManagedButtons />
          <Status />
          <AudioElement />
        </div> 
    </>
  );
};

export default Player;