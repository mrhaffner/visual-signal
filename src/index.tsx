import React from 'react';
import ReactDOM from 'react-dom';
// @ts-ignore
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';
import '@fontsource/roboto';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
