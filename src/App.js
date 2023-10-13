import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import Catalog from "./components/Catalog";
import CardStnd from "./components/CardStnd";
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={
    <div style={{maxHeight:'90hv', boxSizing:'border-box'}}>
      <h1 className="text-center">Rick & Morty</h1>
      <Catalog />
    </div>}/>
    <Route path="/profile/:id" element={<Container className="d-flex flex-column min-vh-100 justify-content-center align-items-center"><CardStnd /></Container> }/>
    </Routes>
    </BrowserRouter>
  );
};

export default App;
