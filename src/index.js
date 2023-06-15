import React from 'react';
import './index.css';
import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store'
import './assets/css/main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/js/bootstrap.bundle.js';

// window.location.hostname('http://localhost:8080/') ?
// hydrateRoot(
//     document.getElementById('root'),
//   <Provider store={store}>
//       <BrowserRouter>
//         <App />
//     </BrowserRouter>
//   </Provider>
//   )
//   : 

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
      <Provider store={store}>
      <BrowserRouter>
      <App/>
      </BrowserRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
