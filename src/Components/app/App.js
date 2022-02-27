import './App.css';
import React from 'react';
import {Home} from '../home/home';
import {Todo} from '../todo/todo';
import {Header} from '../header/header'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  return (
    <div className="App">
        <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<Todo />} />  
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
