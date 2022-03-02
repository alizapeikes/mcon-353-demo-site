import './App.css';
import React from 'react';
import {Home} from '../home/home';
import {Todo} from '../todo/todo';
import {Header} from '../header/header'
import { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


//Add createContext here
export const TodoContext = React.createContext();

function App() {
  const[list, setList] = useState([]);
  return (
    <div className="App">
      <TodoContext.Provider
              value={{
                list,
                setList
              }}
      >
          <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/todo" element={<Todo />} />  
            </Routes>
          </BrowserRouter>
      </TodoContext.Provider>
    </div>
  );
}
export default App;
