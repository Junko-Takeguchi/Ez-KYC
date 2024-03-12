import React from 'react'
import Navbar from './Navbar'
import { useCallback, useEffect, useState } from 'react';
import gptImgLogo from "../assets/images.png"
import sendButton from "../assets/send.svg"
import Userimg from "../assets/user-icon.png"

const Chat = () => {
  const [input, setInput] = useState('');
    const [questionId, setQuestionId] = useState(0);
    const [userResponses, setUserResponses] = useState('');
    const [chatHistory, setChatHistory] = useState([
        {
            text: `Hi, I am your online KYC assistant. Chat with me and get your KYC done.`,
            isBot: true,
            question_id: 0
        },
        {
          text: `Hello This is Vikrant`,
          isBot: false,
          question_id: 0
      },
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const predefined_questions = [
      "I love hearing about outdoor activities! Do you enjoy any in particular, like walking or running?",
      "Pets bring so much joy! Do you have any pets, perhaps for those walks?",
      "What about leisure time? Any hobbies like gardening or swimming that you're fond of?",
      "Everyone has something they're dealing with or interested in. Any advice or help you're looking for lately, perhaps with gardening or tech?"
  ];
  const getCurrentQuestion = () => {
    if (questionId < predefined_questions.length) {
        return predefined_questions[questionId];
    }
    return ''; // Or some end message
};

const handleInputChange = (e) => {
  setInput(e.target.value);
};

const handleSubmit = async (e) => {

}
const handleEnter = async (e) => {
  if (e.key === 'Enter') {
      e.preventDefault();
      await handleSubmit(e);
  }
}




  return (
    <div className="w-full bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 " >
            <Navbar>
            </Navbar>
            <div className="max-w-screen-lg w-full mx-auto pt-20 flex flex-col h-screen pb-8 gap-5 overflow-hidden">
                <div className='flex-grow overflow-auto px-4 pb-1 ' >
                    <div className="flex flex-col gap-5">
                        {chatHistory.map((message, i) => // Changed 'answer' to 'chatHistory'
                            <div key={i}>
                                <div className={"flex gap-3 rounded-lg overflow-hidden p-1.5 " + (message.isBot ? " bg-slate-100 text-slate-900 dark:text-slate-200 dark:bg-slate-900 border-b border-primary border-opacity-50 " : "")}>
                                    <img className=' w-8 h-8 sm:w-10 sm:h-10 rounded-full ' src={message.isBot ? gptImgLogo : Userimg} alt="" />
                                    <p className=" mt-0.5 sm:mt-2">{message.text}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    
                </div>
                <div className="flex items-center bg-slate-100  dark:bg-slate-900 p-2.5 rounded-lg mx-4">
                    <input value={input}
                        className='flex-grow bg-inherit focus:outline-none'
                        onChange={handleInputChange}
                        onKeyDown={handleEnter}
                        disabled={isSubmitting}
                        autoFocus={true}
                        
                        placeholder={!isSubmitting ? "Enter your message" : "Awaiting response..."} type="text" />
                        <button onClick={handleSubmit}>
                        {!isSubmitting ? <img src={sendButton} alt="send" /> : null}
                    </button>
                    
                </div>
            </div>
        </div>
  )
}

export default Chat
