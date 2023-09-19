'use client';

import { useEffect, useState } from 'react';

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-10">
      <div
        className={`flex flex-col ${
          messages.length == 0 ? '' : 'flex-grow'
        } w-full max-w-4xl bg-white shadow-xl rounded-lg overflow-hidden`}
      >
        <div
          className={`flex flex-col flex-grow ${
            messages.length == 0 ? 'hidden' : 'h-0'
          } p-4 overflow-auto`}
        >
          {/* Iterate over the messages array and render each message based on the sender */}
          {messages.map((message) => {
            // If the message sender is the user, render it differently than if the sender is a bot
            return message.sender === 'user' ? (
              <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                <div>
                  <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                    <p className="text-sm">{message.message}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
              </div>
            ) : (
              <div className="flex w-full mt-2 space-x-3 max-w-xs">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                <div>
                  <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                    <p className="text-sm">{message.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Render the footer section with an input field for typing messages */}
        <div className="bg-gray-300 p-4">
          <input
            className="flex items-center h-10 w-full rounded px-3 text-sm"
            type="text"
            placeholder="Type your message…"
            value={inputMessage}
            // Update the inputMessage state variable when the input field value changes
            onChange={(e) => setInputMessage(e.target.value)}
            // Call the handleSendMessage function when the user presses a key in the input field
            onKeyDown={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}
