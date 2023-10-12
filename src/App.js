import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import Catalogo from "./components/Catalog";

const App = () => {
  return (
    <div style={{maxHeight:'90hv', boxSizing:'border-box'}}>
      <h1 className="text-center">Rick & Morty</h1>
      <Catalogo />
    </div>
  );
};

export default App;
