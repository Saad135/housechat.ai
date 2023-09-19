'use client';

import { useEffect, useState } from 'react';
import ChatBox from './chatbox';

export default function Home() {
  // Declare a state variable called "messages" and initialize it with an empty array
  const [messages, setMessages] = useState([]);

  // Declare a state variable called "inputMessage" and initialize it with an empty string
  const [inputMessage, setInputMessage] = useState('');

  // // Use the useEffect hook to update the messages array with the initial conversation
  // useEffect(() => {
  //   setMessages([
  //     {
  //       sender: 'user',
  //       message: 'Hello',
  //     },
  //     {
  //       sender: 'bot',
  //       message: 'Hi, how are you?',
  //     },
  //   ]);
  // }, []);

  // Function to handle the sending of messages when the user presses the Enter key
  const handleSendMessage = (e) => {
    // Check if the pressed key is "Enter" and there is a non-empty message in inputMessage
    if (e.key === 'Enter' && inputMessage) {
      // Add the user's message and a bot response to the messages array
      setMessages([
        ...messages,
        { sender: 'user', message: inputMessage },
        { sender: 'bot', message: 'Nice!' },
      ]);
      // Reset the input message field
      setInputMessage('');
    }
  };

  // Render the main div and its contents, including the messages and input field
  return (
    <ChatBox
      messages={messages}
      inputMessage={inputMessage}
      setInputMessage={setInputMessage}
      handleSendMessage={handleSendMessage}
    />
  );
}
