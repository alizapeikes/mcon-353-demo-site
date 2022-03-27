import './App.css';
import {TodoProvider} from '../../State/context'
import React from 'react';
import {Home} from '../home/home';
import {Todo} from '../todo/todo';
import {Header} from '../header/header'
import {Chat} from '../chat/chat'
import { HashRouter, Routes, Route,} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <TodoProvider>
          <HashRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/todo" element={<Todo />} />  
                <Route path="/chat" element={<Chat />} />  
            </Routes>
          </HashRouter>
      </TodoProvider>
    </div>
  );
}
export default App;
