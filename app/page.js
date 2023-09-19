'use client';

import { useEffect, useState } from 'react';
import ChatBox from './chatbox';
import Link from 'next/link';

export default function Home() {
  // Declare a state variable called "messages" and initialize it with an empty array
  const [messages, setMessages] = useState([]);

  // Declare a state variable called "inputMessage" and initialize it with an empty string
  const [inputMessage, setInputMessage] = useState('');

  // List of property objects that will be derived from the bot
  const [properties, setproperties] = useState([]);

  // Selected property that will be shown on detailed view
  const [selectedProperty, setselectedProperty] = useState(null);

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
      setproperties(['a', 'b', 'c']);
      setInputMessage('');
    }
  };

  // Render the main div and its contents, including the messages and input field
  return (
    <div className="flex">
      <div hidden={properties.length == 0} className="p-4 min-w-[15%]">
        {properties.map((property, idx) => (
          <a
            onClick={() => setselectedProperty({ a: property })}
            href="#"
            key={idx}
          >
            <div className="my-5 flex shadow-sm rounded-lg text-blue-200 items-center justify-center w-full h-20 bg-blue-800">
              <span>{property}</span>
            </div>
          </a>
        ))}
      </div>
      <div hidden={!selectedProperty} className="flex-grow">
        <p>{!selectedProperty ? 'test' : selectedProperty.a}</p>
      </div>
      <div className={`flex-grow ${selectedProperty ? 'max-w-[30%]' : ''}`}>
        <ChatBox
          messages={messages}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
          selectedProperty={selectedProperty}
        />
      </div>
    </div>
  );
}
