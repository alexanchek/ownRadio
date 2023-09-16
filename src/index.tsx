import ReactDOM from 'react-dom/client';
import App from './App';
import { PlayerContextProvider } from './Context';
import { register as registerServiceWorker } from './serviceWorkerRegistration';
import './index.css';
import { Offline } from './components/Offline';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <PlayerContextProvider>
    <Offline>
      <App />
    </Offline>
  </PlayerContextProvider>
);

registerServiceWorker();