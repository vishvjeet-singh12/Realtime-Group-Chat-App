import React from 'react';
import ReactDOM from 'react-dom/client';
import "./Component/All.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App';
import { Toaster } from 'sonner';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Toaster richColors position="top-right" />
    <App />
  </React.StrictMode>
);
