import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { ReactTyped } from "react-typed";

const ImageCapture = ({ setCapturedImage }) => {
  const webcamRef = React.useRef(null);
  const [captured, setCaptured] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const navigate = useNavigate();

  const captureImage = () => {
    const newImageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(newImageSrc);
    setImageSrc(newImageSrc);
    setCaptured(true);
  };

  const retakeImage = () => {
    setImageSrc(null);
    setCaptured(false);
  };

  const acceptImage = () => {
    navigate('/kyc');
    console.log("hello");
  };

  return (
    <div className="w-full mx-auto flex flex-col items-center justify-center dark:bg-slate-950 min-h-screen">
      <p className='text-[#e19947] text-2xl font-bold p-2 text-center'>Welcome to Ez-Kyc, to initiate the KYC verification process, we will need a quick picture</p>
      <p className='md:text-2xl sm:text-4xl text-xl font-bold text-white'>Smile and<span><ReactTyped className='text-white md:text-2xl sm:text-4xl text-xl font-bold pl-2' strings={['Say Cheese!']} typeSpeed={120} backSpeed={140} loop/></span></p>
      <div className="relative pt-8">
        
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="rounded-3xl border"
        />
        {captured && (
          <div className="absolute top-4 left-0 w-full h-full flex justify-center items-center">
            <img src={imageSrc} alt="Captured" className="rounded-3xl border" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          </div>
        )}
      </div>
      <div className="mt-10 flex justify-center space-x-4">
        {!captured && (
          <button onClick={captureImage} className="px-4 py-2 bg-[#e19947] text-white rounded font-bold cursor-pointer">
            CAPTURE
          </button>
        )}
        {captured && (
          <div className='mb-5'>
            <button onClick={acceptImage} className="px-4 py-2 mr-5 bg-green-500 text-white rounded font-bold cursor-pointer">
              ACCEPT
            </button>
            <button onClick={retakeImage} className="px-4 py-2 bg-red-500 text-white rounded font-bold cursor-pointer">
              RETAKE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCapture;

