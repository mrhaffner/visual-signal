import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CssBaseline, StylesProvider } from '@material-ui/core';
import '@fontsource/roboto';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <StylesProvider injectFirst>
      <App />
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
