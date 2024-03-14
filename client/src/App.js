import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Hero from './components/Hero';
import Chat from './components/Chat';
import ImageCapture from './components/ImageCapture'; // Assuming you create this component

function App() {
  const [capturedImage, setCapturedImage] = useState(null);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/capture-image" element={<ImageCapture setCapturedImage={setCapturedImage} />} />
          {capturedImage ? (
            <Route path="/kyc" element={<Chat capturedImage={capturedImage} />} />
          ) : (
            <Route path="/kyc" element={<Navigate to="/capture-image" />} />
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
