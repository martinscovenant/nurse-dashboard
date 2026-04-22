import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { PatientProvider } from "./context/PatientContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <PatientProvider>
      <App />
    </PatientProvider>
  </BrowserRouter>
);
