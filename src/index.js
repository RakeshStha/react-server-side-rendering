import App from './App';
import reportWebVitals from './reportWebVitals';
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from './pages/Home'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
    {
    path: "/home",
    element: <Home/>
  },
]);

ReactDOM.hydrateRoot(document.getElementById('root'), <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();