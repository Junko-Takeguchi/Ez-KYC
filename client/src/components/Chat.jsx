import React from 'react'
import Navbar from './Navbar'
import { useCallback, useEffect, useState } from 'react';
import gptImgLogo from "../assets/images.png"
import sendButton from "../assets/send.svg"
import Userimg from "../assets/user-icon.png"
import {useTranslation} from "react-i18next";
import * as i18n from "i18next";

const Chat = ({lang, setLang}) => {
  const [input, setInput] = useState('');
    const [questionId, setQuestionId] = useState(0);
    const [userResponses, setUserResponses] = useState('');
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("")
    const [turn, setTurn] = useState(0);
    // const [lang, setLang] = useState("en");
    const { t } = useTranslation();
    const [chatHistory, setChatHistory] = useState([
        {
            text: t("question-1"),
            isBot: true,
            question_id: 0
        },
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        console.log(chatHistory);
    }, [chatHistory]);

    const predefined_questions = [
      "Hello! To get started with your e-KYC process, may I have your full firstName, please?",
      "Thank you, John! Next, could you please provide your date of birth?",
      "Great! Now, could you kindly share your current residential address with us?",
      "Excellent! We're almost done. Could you please upload a clear photo of yourself for identification purposes?",
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update the corresponding state based on the input name
        if (name === "firstName") {
            setFirstName(value);
        } else if (name === "lastName") {
            setLastName(value);
        } else {
            setInput(value);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the form from submitting

        // Get the value from the input field
        const inputValue = input.trim(); // Remove leading and trailing whitespace

        if (inputValue) {
            setTurn(turn + 1); // Increment the turn by 1

            // Calculate the new question_id based on the turn
            const newQuestionId = turn+1;

            // Create a new user message with the input value and the new question_id
            const newUserMessage = {
                text: inputValue, // Use the input value
                isBot: false,
                question_id: newQuestionId
            };

            // Create a new bot message with the next predefined question and the new question_id
            const newBotMessage = {
                text: predefined_questions[turn], // Use the next predefined question
                isBot: true,
                question_id: newQuestionId
            };

            // Update the chatHistory state immutably by spreading the existing array and adding the new messages
            setChatHistory([...chatHistory, newUserMessage, newBotMessage]);

            setInput(''); // Clear the input field after submission
        }
    };


    const handleEnter = (e) => {
      if (e.key === 'Enter') {
          e.preventDefault();
           handleSubmit(e);
      }
    }

    return (
        <div className="flex flex-col w-full bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 " >
            <div className="max-w-screen-lg w-full mx-auto flex flex-col h-screen pb-8 gap-5">
                <Navbar lang={lang} handleChange={(s) => {
                    setLang(s);
                    i18n.changeLanguage(lang);
                }}/>
                <div className='flex-grow overflow-auto px-4 pb-1 ' >
                    <div className="flex flex-col gap-5">
                        {chatHistory.map((message, i) => // Changed 'answer' to 'chatHistory'
                            <div>
                                <div className={"flex flex-col gap-3 rounded-lg overflow-hidden p-1.5 " + (message.isBot ? " bg-slate-100 text-slate-900 dark:text-slate-200 dark:bg-slate-900 border-b border-primary border-opacity-50 " : "")}>
                                    <div className="flex gap-3">
                                        <img className=' w-8 h-8 sm:w-10 sm:h-10 rounded-full ' src={message.isBot ? gptImgLogo : Userimg} alt="" />
                                        <p className=" mt-0.5 sm:mt-2">{message.text}</p>
                                    </div>
                                    {message.question_id === 1 && message.isBot && <div className="pl-12 flex gap-2">
                                        <input
                                            className="px-4 py-1 border border-neutral-300 rounded-md"
                                            type="text"
                                            placeholder="First Name"
                                            required
                                            name="firstName"
                                            value={firstName}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            className="px-4 py-1 border border-neutral-300 rounded-md"
                                            type="text"
                                            placeholder="Last Name"
                                            required
                                            name="lastName"
                                            value={lastName}
                                            onChange={handleInputChange}
                                        />
                                        <button className="px-2 py-1 rounded-md b text-white bg-black hover:bg-slate-500 transition">Submit</button>
                                    </div>}
                                    {message.question_id === 2 && message.isBot && <div className="pl-12 flex gap-2">
                                        <div className="relative max-w-sm">
                                            <div
                                                className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                     aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                     fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                                </svg>
                                            </div>
                                            <input datepicker type="text"
                                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                   placeholder="Select date"/>
                                        </div>
                                        <button className="px-2 py-1 rounded-md b text-white bg-black hover:bg-slate-500 transition">Submit</button>
                                    </div>}
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
