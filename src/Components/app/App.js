import './App.css';
import {TodoProvider} from '../../State/context'
import React from 'react';
import {Home} from '../home/home';
import {Todo} from '../todo/todo';
import {Header} from '../header/header'
import {Chat} from '../chat/chat'


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <TodoProvider>
          <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/todo" element={<Todo />} />  
                <Route path="/chat" element={<Chat />} />  
            </Routes>
          </BrowserRouter>
      </TodoProvider>
    </div>
  );
}
export default App;
