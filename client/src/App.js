import React, {useState} from 'react'
import Hero from './components/Hero';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Chat from './components/Chat';


function App() {
  const [lang, setLang] = useState("en");
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Hero lang={lang} setLang={setLang}/>} />
    <Route path="/kyc" element={<Chat lang={lang} setLang={setLang}/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
