// Import useEffect at the top of your component file
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import gptImgLogo from "../assets/images.png";
import sendButton from "../assets/send.svg";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.module.css'
import axios from 'axios';
import dictionary from "../../public/translations";

const Chat = ({ capturedImage }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [input, setInput] = useState('');
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");
    const [turn, setTurn] = useState(0);
    const [refId, setRefId] = useState("");
    const [imageData, setImageData] = useState(null);
    const [phqId, setPhqId] = useState(null);
    const [language, setLanguage] = useState('en'); // Add language state
    const [currentQuestionId, setCurrentQuestionId] = useState(0); // Add currentQuestionId state

    const [chatHistory, setChatHistory] = useState([
        {
            text: 'Hi, I am your online KYC assistant. Chat with me and get your KYC done',
            isBot: true,
            question_id: 0
        },
    ]);

    useEffect(() => {
        console.log(chatHistory);
    }, [chatHistory]);

    useEffect(() => {
        console.log(refId); // Log refId whenever it changes
    }, [refId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "firstName") {
            setFirstName(value);
        } else if (name === "lastName") {
            setLastName(value);
        } else {
            setInput(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const inputValue = input.trim();

        if (selectedDate) {
            console.log(String(selectedDate).slice(0, 15));
        }

        const newQuestionId = currentQuestionId + 1;
        let newUserMessage = {};

        if (currentQuestionId === 1) {
            newUserMessage = {
                text: firstName + " " + lastName,
                isBot: false,
                question_id: currentQuestionId
            };
        } else if (currentQuestionId === 2) {
            newUserMessage = {
                text: String(selectedDate).slice(0, 3) + ',' + String(selectedDate).slice(3, 15),
                isBot: false,
                question_id: currentQuestionId
            };
        } else if (currentQuestionId === 3) {
            newUserMessage = {
                text: inputValue,
                isBot: false,
                question_id: currentQuestionId
            };
            try {
                const response = await axios.post('http://localhost:3001/api/aadhaar/otp/send', { aadhaarNo: inputValue });
                console.log(response.data);
                if (response.data.ref_id) {
                    setRefId(response.data.ref_id);
                }
            } catch (error) {
                console.error("Error sending Aadhaar number:", error);
            }
        } else if (currentQuestionId === 4) {
            newUserMessage = {
                text: inputValue,
                isBot: false,
                question_id: currentQuestionId
            };
            try {
                const response = await axios.post('http://localhost:3001/api/aadhaar/otp/verify', { ref_id: refId, otp: inputValue });
                console.log(response.data);
                console.log(response.data.data.status);
                if (response.data.data.status === "VALID") {
                    const { name, care_of, dob, address, photo_link } = response.data.data;
                    console.log(photo_link);
                    setImageData(photo_link);
                    setPhqId(currentQuestionId + 1);
                    const cardMessage = `Your OTP and face has been verified successfully!!\n\nName: ${name}\nFather's Name: ${care_of}\nDate of Birth: ${dob}\nAddress: ${address}`
                    newUserMessage = {
                        text: cardMessage.split('\n').map((line, index) => <div key={index}>{line}<br /></div>), // Render line breaks as <br />
                        isBot: true,
                        question_id: currentQuestionId + 1,
                        imgSrc: photo_link
                    };
                } else {
                    newUserMessage = {
                        text: "Invalid OTP. Please try again.",
                        isBot: true,
                        question_id: currentQuestionId
                    };
                }
            } catch (error) {
                console.error("Error verifying Aadhaar OTP:", error);
                newUserMessage = {
                    text: "Error verifying Aadhaar OTP. Please try again later.",
                    isBot: true,
                    question_id: currentQuestionId
                };
            }
        } else {
            newUserMessage = {
                text: inputValue,
                isBot: false,
                question_id: currentQuestionId
            };
        }

        const languageTranslation = dictionary[language].translation;
        const newBotMessageText = languageTranslation[`question${newQuestionId}`];
        const newBotMessage = {
            text: newBotMessageText,
            isBot: true,
            question_id: newQuestionId
        };

        setChatHistory([...chatHistory, newUserMessage, newBotMessage]);
        setInput('');
        setCurrentQuestionId(newQuestionId);
    };
    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };
    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="w-full bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 " >
            <Navbar />
            <div className="max-w-screen-lg w-full mx-auto pt-20 flex flex-col h-screen pb-8 gap-5 overflow-hidden">
                <div className='flex-grow overflow-auto px-4 pb-1 ' >
                    <div className="flex flex-col gap-5">
                        {chatHistory.map((message, i) =>
                            <div key={i}>
                                <div className={"flex flex-col gap-3 rounded-lg overflow-hidden p-1.5 " + (message.isBot ? " bg-slate-100 text-slate-900 dark:text-slate-200 dark:bg-slate-900 border-b border-primary border-opacity-50 " : "")}>
                                    <div className="flex gap-3">
                                        <img className=' w-8 h-8 sm:w-10 sm:h-10 rounded-full ' src={message.isBot ? gptImgLogo : capturedImage} alt="" />
                                        <div className="flex flex-col gap-2">
                                            {imageData && phqId && message.question_id === phqId && (
                                                <img src={`data:image/jpeg;base64,${imageData}`} className="w-1/5" alt="Base64 Image" />
                                            )}
                                            <p className=" mt-0.5 sm:mt-2">{message.text}</p>
                                        </div>
                                    </div>
                                    {message.question_id === 1 && message.isBot && <div className="pl-12 flex gap-2">
                                    <input
                                        className="px-4 py-1 border border-neutral-300 rounded-md text-black" // Add text-black class here
                                        type="text"
                                        placeholder="First Name"
                                        required
                                        name="firstName"
                                        value={firstName}
                                        onChange={handleInputChange}
                                    />

                                    <input
                                        className="px-4 py-1 border border-neutral-300 rounded-md text-black" // Add text-black class here
                                        type="text"
                                        placeholder="Last Name"
                                        required
                                        name="lastName"
                                        value={lastName}
                                        onChange={handleInputChange}
                                    />
                                        <button className="px-2 py-1 rounded-md b text-white bg-black hover:bg-slate-500 transition" onClick={handleSubmit}>Submit</button>
                                    </div>}
                                    {message.question_id === 2 && message.isBot && (
                                        <div className='text-black'>
                                        <DatePicker
                                            selected={selectedDate}
                                            onChange={date => setSelectedDate(date)}
                                            isClearable
                                            dateFormat='dd/MM/yyyy'
                                            maxDate={new Date()}
                                            showYearDropdown
                                            scrollableMonthYearDropdown
                                            className='text-black px-2 rounded-md p-2' // Add text-black class here
                                            // Add the following props
                                            placeholderText="Select Date"
                                            value={selectedDate} // Set the value of the input field to the selected date
/>
                                        <button className="px-2 py-1 rounded-md b text-white bg-black hover:bg-slate-500 transition" onClick={handleSubmit}>Submit</button>
                                        </div>
                                    )}
                                    
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex items-center bg-slate-100  dark:bg-slate-900 p-2.5 rounded-lg mx-4">
                    <select value={language} onChange={handleLanguageChange} className="bg-transparent border-none focus:outline-none mr-2">
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="bn">Bengali</option>
                        <option value="mr">Marathi</option>
                    </select>
                    <input
                        value={input}
                        className='flex-grow bg-inherit focus:outline-none'
                        onChange={handleInputChange}
                        onKeyDown={handleEnter}
                        autoFocus={true}
                        placeholder={!input ? "Enter your message" : "Awaiting response..."}
                        type="text"
                    />
                    <button onClick={handleSubmit}>
                        {!input && <img src={sendButton} alt="send" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
