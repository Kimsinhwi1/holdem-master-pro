import React from 'react';
import ReactDOM from 'react-dom/client';
import ProPokerMaster from './ProPokerMaster.jsx';
import './index.css';

const App = () => {
  return <ProPokerMaster />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);