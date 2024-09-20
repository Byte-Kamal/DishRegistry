import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Removing StrictMode to avoid double rendering
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
