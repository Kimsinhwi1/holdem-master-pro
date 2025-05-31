import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import ProPokerMaster from './ProPokerMaster.jsx';
import './index.css';

// SEO 최적화된 앱 래퍼
const App = () => {
  return (
    <HelmetProvider>
      <ProPokerMaster />
    </HelmetProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);