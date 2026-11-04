import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Register Service Worker for PWA (Progressive Web App)
if ('serviceWorker' in navigator && (import.meta.env.PROD || window.location.protocol === 'https:')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .then((reg) => {
        console.log('Sanatan PWA Service Worker active:', reg.scope);
      })
      .catch((err) => {
        console.warn('Sanatan PWA Service Worker registration failed:', err);
      });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
