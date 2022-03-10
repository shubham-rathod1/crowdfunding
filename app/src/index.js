import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider } from 'react-moralis';
import AppContextProvider from './context/AppContextProvider';
import Router from './routes';

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider
      appId='LuYkyHpIaQbsgCBJEHEHKOqAzIrMORx0dG9KZAud'
      serverUrl='https://mi5i6zagjax0.usemoralis.com:2053/server'
    >
      <AppContextProvider>
        <Router />
      </AppContextProvider>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
