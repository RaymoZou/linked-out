import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// this is required for tailwindcss to work for nested children
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <App/>
);
