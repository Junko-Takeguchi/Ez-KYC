import React from 'react'
import Hero from './components/Hero';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Chat from './components/Chat';


function App() {
  return (
    <BrowserRouter>
    <div>
    <Routes>
    <Route path="/" element={<Hero />} />
    <Route path="/kyc" element={<Chat />} />
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
