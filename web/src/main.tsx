import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.sass';
import { MantineProvider } from '@mantine/core';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </React.StrictMode>,
);
