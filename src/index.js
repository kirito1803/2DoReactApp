/*<---- FIRST FILE TO RUN IN THE APP ---->*/

// !!! Basic Setup for the App
import React from 'react';
import ReactDOM from 'react-dom';
// Self-styling
import './index.scss';
// Import Global variables
import './asset/GlobalVariables/_colorsVariables.scss'
// Import Component
import App from './App';
// Import requirement
import ScratchData from './database/ScratchData';
// !!! Uncomment bellow import incase measuring performance
// import reportWebVitals from './reportWebVitals';

//const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root'),
  // Rendering the first ever scratch data
  () => {
    if (!localStorage.getItem('2Do')) {
      localStorage.setItem('2Do', JSON.stringify(ScratchData))
    }
  }
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
