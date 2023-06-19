import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import { Config } from "./Config";


const Home = lazy(() => import('./components/pages/Home'));
const About = lazy(() => import("./components/pages/About"));
const Contact = lazy(() => import("./components/pages/Contact"));
const FilmDetail = lazy(() => import("./components/pages/FilmDetail"));
const Films = lazy(() => import('./components/pages/Films'));

function App() {
  return (
    <>
      <Navbar/>
     <Routes>
        <Route exact path="/" element={<Suspense fallback={<div>Loading</div>}><Home/></Suspense>} />
        <Route path="/about" element={<Suspense fallback={<div>Loading</div>}><About/></Suspense>} />
        <Route path="/contact" element={<Suspense fallback={<div>Loading</div>}><Contact /></Suspense>} />
        <Route path="/films" element={<Suspense fallback={<div>Loading</div>}><Films/></Suspense>} />
         <Route path="/films/:id" element={<Suspense fallback={<div>Loading</div>}><FilmDetail/></Suspense>} />
      </Routes>
    </>
  );
}

export default App;
