import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/styles.scss';
import { BrowserRouter } from 'react-router-dom'
import { StormApp } from './StormApp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <StormApp />
  </BrowserRouter>
);
