import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import { hydrateRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store'

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
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
      <App/>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  )

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
