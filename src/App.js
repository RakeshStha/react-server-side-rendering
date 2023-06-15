import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import FilmDetail from "./components/pages/FilmDetail";
import Films from "./components/pages/Films";
import Navbar from "./components/shared/Navbar";

function App() {
  return (
    <>
      <Navbar/>
     <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/films" element={<Films/>} />
         <Route path="/films/:id" element={<FilmDetail/>} />
      </Routes>
    </>
  );
}

export default App;
