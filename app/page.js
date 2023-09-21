'use client';

import { useEffect, useState } from 'react';
import ChatBox from './chatbox';
import Link from 'next/link';
import PropertyDetails from './property-details';
import PropertyList from './property-list';
import Hero from './hero';
import TopBar from './top-bar';

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
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Hero
        properties={properties}
        selectedProperty={selectedProperty}
        setselectedProperty={setselectedProperty}
        messages={messages}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}
