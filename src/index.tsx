import ReactDOM from 'react-dom/client';
import App from './App';
import { PlayerContextProvider } from './Context';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <PlayerContextProvider>
    <App />
  </PlayerContextProvider>
);