// Import useEffect at the top of your component file
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import gptImgLogo from "../assets/images.png";
import sendButton from "../assets/send.svg";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.module.css'
import axios from 'axios';

const Chat = ({ capturedImage }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [input, setInput] = useState('');
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");
    const [turn, setTurn] = useState(0);
    const [refId, setRefId] = useState("");
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

    const predefined_questions = {
        en: {
            translation: {
                question0: "Hi, I am your online e-KYC assistant. Chat with me and get your e-KYC done.",
                question1: "Hello! To get started with your e-KYC process, may I have your full Name, please?",
                question2: "Thank you! Next, could you please provide your date of birth?",
                question3: "Excellent! We're almost done. Could you please enter your 12 digit AADHAAR number?",
                question4: "Please enter the OTP sent to the registered mobile number.",
                question5: "Congratulations! Your KYC has been successfully completed."
            }
        },
        hi: {
            translation: {
                question0: "नमस्ते, मैं आपका ऑनलाइन ई-केवाईसी सहायक हूँ। मुझसे चैट करें और अपनी ई-केवाईसी को पूरा करें।",
                question1: "नमस्ते! आपकी ई-केवाईसी प्रक्रिया शुरू करने के लिए, क्या मैं आपका पूरा नाम जान सकता हूँ?",
                question2: "धन्यवाद! अगला, क्या आप कृपया अपनी जन्म तिथि प्रदान कर सकते हैं?",
                question3: "उत्कृष्ट! हम लगभग खत्म हो चुके हैं। क्या आप कृपया अपना 12 अंकों का आधार नंबर दे सकते हैं?",
                question4: "कृपया पंजीकृत मोबाइल नंबर पर भेजे गए OTP को दर्ज करें।",
                question5: "बधाई हो! आपकी केवाईसी सफलतापूर्वक पूरी हो गई है।"
            }
        },
        bn: {
            translation: {
                question0: "হাই, আমি আপনার অনলাইন ই-কেওয়াইসি সহায়ক। আমার সাথে চ্যাট করুন এবং আপনার ই-কেওয়াইসি সম্পন্ন করুন।",
                question1: "হ্যালো! আপনার ই-কেওয়াইসি প্রক্রিয়া শুরু করার জন্য, আমি কি আপনার পূরো নাম জানতে পারি?",
                question2: "ধন্যবাদ! পরবর্তী, আপনি কি আপনার জন্ম তারিখ প্রদান করতে পারবেন?",
                question3: "অসাধারণ! আমরা প্রায় সম্পূর্ণ হয়ে গেছি। আপনি কি দয়া করে আপনার 12 অংকের আধার নম্বর প্রবেশ করতে পারেন?",
                question4: "দয়া করে নিবন্ধিত মোবাইল নম্বরে প্রেরিত ওটিপি প্রবেশ করুন।",
                question5: "অভিনন্দন! আপনার কেওয়াইসি সফলভাবে সম্পন্ন হয়েছে।"
            }
        },
        mr: {
            translation: {
                question0: "नमस्कार, मी तुमचे ऑनलाइन ई-केव्हायसी सहायक आहे। माझ्याशी चॅट करा आणि तुमची ई-केव्हायसी पूर्ण करा।",
                question1: "नमस्कार! तुमच्या ई-केव्हायसी प्रक्रिया सुरू करण्यासाठी, काय मला तुमचे पूर्ण नाव मिळवू शकते?",
                question2: "धन्यवाद! पुढे, कृपया तुमची जन्म तारीख प्रदान करू शकता का?",
                question3: "उत्कृष्ट! आम्ही लवकरच संपले आहोत. कृपया आपला 12 अंकी आधार क्रमांक प्रविष्ट करा",
                question4: "कृपया पंजीकृत मोबाइल नंबरवर पाठविलेल्या OTP प्रविष्ट करा।",
                question5: "अभिनंदन! आपली केव्हायसी सफळतापूर्वक पूर्ण झाली आहे."
            }
        }
    };

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
                    const cardMessage = `The OTP is verified successfully!!\n\nName: ${name}\nFather's Name: ${care_of}\nDate of Birth: ${dob}\nAddress: ${address}`
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

        const languageTranslation = predefined_questions[language].translation;
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
                                        <p className=" mt-0.5 sm:mt-2">{message.text}</p>

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
